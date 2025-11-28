import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface FileUploadOptions {
  destinationDir: string;
  filename: string;
  buffer: Buffer;
}

export interface FileRemovalOptions {
  filePath: string;
  suppressErrors?: boolean;
}

/**
 * Service responsible for file system operations
 * Follows Single Responsibility Principle by handling only file-related operations
 */
@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);

  /**
   * Ensures a directory exists, creating it if necessary
   * @param dirPath - Absolute path to directory
   */
  ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      this.logger.log(`Created directory: ${dirPath}`);
    }
  }

  /**
   * Writes a file to the filesystem
   * @param options - File upload configuration
   * @returns Relative path to the uploaded file
   */
  uploadFile(options: FileUploadOptions): string {
    const { destinationDir, filename, buffer } = options;

    // Ensure directory exists
    this.ensureDirectoryExists(destinationDir);

    // Write file
    const filePath = path.join(destinationDir, filename);
    fs.writeFileSync(filePath, buffer);
    
    this.logger.log(`File uploaded successfully: ${filePath}`);
    
    // Return relative path from project root
    return path.relative(process.cwd(), filePath);
  }

  /**
   * Removes a file from the filesystem
   * @param options - File removal configuration
   */
  removeFile(options: FileRemovalOptions): void {
    const { filePath, suppressErrors = true } = options;

    if (!fs.existsSync(filePath)) {
      this.logger.warn(`File not found for removal: ${filePath}`);
      return;
    }

    try {
      fs.unlinkSync(filePath);
      this.logger.log(`File removed successfully: ${filePath}`);
    } catch (error) {
      if (!suppressErrors) {
        throw error;
      }
      this.logger.error(`Failed to remove file: ${filePath}`, error);
    }
  }

  /**
   * Lists files in a directory matching a pattern
   * @param dirPath - Directory to search
   * @param pattern - String pattern or RegExp to match filenames
   * @returns Array of matching filenames
   */
  listFiles(dirPath: string, pattern?: string | RegExp): string[] {
    if (!fs.existsSync(dirPath)) {
      return [];
    }

    const files = fs.readdirSync(dirPath);

    if (!pattern) {
      return files;
    }

    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    return files.filter(file => regex.test(file));
  }

  /**
   * Removes all files matching a pattern in a directory
   * @param dirPath - Directory to search
   * @param pattern - String pattern or RegExp to match filenames
   */
  removeMatchingFiles(dirPath: string, pattern: string | RegExp): void {
    const matchingFiles = this.listFiles(dirPath, pattern);

    for (const filename of matchingFiles) {
      const filePath = path.join(dirPath, filename);
      this.removeFile({ filePath, suppressErrors: true });
    }
  }

  /**
   * Lists all files in a directory as absolute paths
   * @param dirPath - Directory to read
   */
  listAbsoluteFilePaths(dirPath: string): string[] {
    if (!fs.existsSync(dirPath)) {
      return [];
    }

    const filenames = fs.readdirSync(dirPath);
    return filenames.map(filename => path.join(dirPath, filename));
  }

  /**
   * Resolves an absolute file path from a relative URL
   * @param relativeUrl - Relative URL (e.g., /uploads/avatars/user.jpg)
   * @returns Absolute file system path
   */
  resolveFilePath(relativeUrl: string | null): string | null {
    if (!relativeUrl) {
      return null;
    }

    // Remove leading slash if present
    const cleanPath = relativeUrl.startsWith('/') 
      ? relativeUrl.substring(1) 
      : relativeUrl;

    return path.join(process.cwd(), cleanPath);
  }
}
