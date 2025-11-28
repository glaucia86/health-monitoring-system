import { FileValidator } from '@nestjs/common';
import { fileTypeFromBuffer } from 'file-type';

export interface MagicNumberFileTypeValidatorOptions {
  /**
   * Allowed MIME types (e.g., ['image/jpeg', 'image/png'])
   */
  allowedMimeTypes: string[];
}

/**
 * Validator that checks file type by examining magic numbers (file signatures)
 * instead of relying on Content-Type headers which can be easily spoofed.
 *
 * This provides an additional layer of security by verifying the actual
 * file content matches the expected type.
 */
export class MagicNumberFileTypeValidator extends FileValidator<MagicNumberFileTypeValidatorOptions> {
  buildErrorMessage(): string {
    return `File type validation failed. Allowed types: ${this.validationOptions.allowedMimeTypes.join(', ')}`;
  }

  async isValid(file?: Express.Multer.File): Promise<boolean> {
    if (!file || !file.buffer) {
      return false;
    }

    try {
      // Analyze file buffer to detect actual file type by magic numbers
      const fileTypeResult = await fileTypeFromBuffer(file.buffer);

      // If file-type cannot detect the type, reject it
      if (!fileTypeResult) {
        return false;
      }

      // Check if detected MIME type is in allowed list
      return this.validationOptions.allowedMimeTypes.includes(
        fileTypeResult.mime,
      );
    } catch (error) {
      // If any error occurs during validation, reject the file
      return false;
    }
  }
}
