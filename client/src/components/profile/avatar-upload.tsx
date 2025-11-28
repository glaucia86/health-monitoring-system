'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Camera, Upload, Trash2, Loader2, X, ImagePlus, Crop } from 'lucide-react';
import { cn, resolveAssetUrl } from '@/lib/utils';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop';

interface AvatarUploadProps {
  currentAvatarUrl?: string | null;
  userName: string;
  onUpload: (file: File) => Promise<void>;
  onRemove: () => Promise<void>;
  isUploading?: boolean;
  isRemoving?: boolean;
  className?: string;
}

/**
 * Helper function to create image from URL
 */
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

/**
 * Helper function to get cropped image
 */
async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area
): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'));
        return;
      }
      resolve(blob);
    }, 'image/jpeg', 0.95);
  });
}

/**
 * Get initials from a name (first and last name initials)
 */
function getInitials(name: string | null): string {
  if (!name) return 'U';
  
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function AvatarUpload({
  currentAvatarUrl,
  userName,
  onUpload,
  onRemove,
  isUploading = false,
  isRemoving = false,
  className,
}: AvatarUploadProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectButtonRef = useRef<HTMLButtonElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const initials = getInitials(userName);
  const isProcessing = isUploading || isRemoving;
  const resolvedAvatarUrl = resolveAssetUrl(currentAvatarUrl);

  // Max file size: 2MB
  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const ACCEPTED_TYPES = useRef(['image/jpeg', 'image/png', 'image/webp']);

  // Focus select button when dialog opens
  useEffect(() => {
    if (isDialogOpen && selectButtonRef.current) {
      const timer = setTimeout(() => {
        selectButtonRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isDialogOpen]);

  const resetState = useCallback(() => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setError(null);
    setShowCropper(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const processFile = useCallback(
    (file: File) => {
      // Validate file type
      if (!ACCEPTED_TYPES.current.includes(file.type)) {
        setError('Formato inválido. Use JPEG, PNG ou WebP.');
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setError('Arquivo muito grande. Máximo: 2MB.');
        return;
      }

      setError(null);
      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    },
    [MAX_FILE_SIZE]
  );

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        processFile(file);
      }
    },
    [processFile]
  );

  // Drag and drop handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === dropZoneRef.current) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file) {
        processFile(file);
      }
    },
    [processFile]
  );

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropConfirm = async () => {
    if (!previewUrl || !croppedAreaPixels || !selectedFile) return;

    try {
      const croppedBlob = await getCroppedImg(previewUrl, croppedAreaPixels);
      
      // Create a new file from the cropped blob
      const croppedFile = new File([croppedBlob], selectedFile.name, {
        type: 'image/jpeg',
      });
      
      setSelectedFile(croppedFile);
      setShowCropper(false);
      
      // Update preview with cropped image
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(croppedFile);
    } catch {
      setError('Erro ao recortar imagem. Tente novamente.');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      await onUpload(selectedFile);
      resetState();
      setIsDialogOpen(false);
    } catch {
      setError('Erro ao enviar foto. Tente novamente.');
    }
  };

  const handleRemove = async () => {
    setIsRemoveDialogOpen(false);
    try {
      await onRemove();
      setIsDialogOpen(false);
    } catch {
      setError('Erro ao remover foto. Tente novamente.');
    }
  };

  const openRemoveDialog = () => {
    setIsRemoveDialogOpen(true);
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      resetState();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handle keyboard navigation for file input trigger
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      triggerFileInput();
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        <DialogTrigger asChild>
          <button
            type="button"
            className={cn(
              'group relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              className
            )}
            aria-label={`Alterar foto de perfil de ${userName}. ${currentAvatarUrl ? 'Foto atual definida.' : 'Nenhuma foto definida, mostrando iniciais.'}`}
            aria-haspopup="dialog"
          >
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg transition-transform group-hover:scale-105">
              {resolvedAvatarUrl && (
                <AvatarImage
                  key={resolvedAvatarUrl}
                  src={resolvedAvatarUrl}
                  alt=""
                  aria-hidden="true"
                  className="object-cover"
                />
              )}
              <AvatarFallback 
                className="bg-primary text-2xl font-semibold text-primary-foreground"
                aria-hidden="true"
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            <div 
              className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              aria-hidden="true"
            >
              <Camera className="h-8 w-8 text-white" />
            </div>
          </button>
        </DialogTrigger>

        <DialogContent 
          className="sm:max-w-2xl"
          aria-describedby="avatar-dialog-description"
        >
          <DialogHeader>
            <DialogTitle>Alterar foto de perfil</DialogTitle>
            <DialogDescription id="avatar-dialog-description">
              {showCropper 
                ? 'Ajuste o recorte da imagem movendo e fazendo zoom.'
                : 'Arraste uma foto ou selecione do seu dispositivo. Formatos: JPEG, PNG, WebP. Máximo: 2MB.'}
            </DialogDescription>
          </DialogHeader>

          {showCropper && previewUrl ? (
            // Cropper Mode
            <div className="space-y-4">
              <div className="relative h-[400px] w-full bg-muted rounded-lg overflow-hidden">
                <Cropper
                  image={previewUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  cropShape="round"
                  showGrid={false}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="zoom-slider" className="text-sm font-medium">
                  Zoom: {Math.round(zoom * 100)}%
                </label>
                <input
                  id="zoom-slider"
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full"
                  aria-label="Controle de zoom da imagem"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCropper(false);
                    resetState();
                  }}
                  disabled={isProcessing}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  onClick={handleCropConfirm}
                  disabled={isProcessing}
                >
                  <Crop className="mr-2 h-4 w-4" aria-hidden="true" />
                  Aplicar recorte
                </Button>
              </div>
            </div>
          ) : (
            // Selection Mode
            <div className="flex flex-col items-center gap-6 py-4">
              {/* Drag & Drop Zone */}
              {!previewUrl && (
                <div
                  ref={dropZoneRef}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={cn(
                    'w-full border-2 border-dashed rounded-lg p-8 text-center transition-colors',
                    isDragging 
                      ? 'border-primary bg-primary/5' 
                      : 'border-muted-foreground/25 hover:border-primary/50'
                  )}
                  role="button"
                  tabIndex={0}
                  onClick={triggerFileInput}
                  onKeyDown={handleKeyDown}
                  aria-label="Área para arrastar e soltar arquivo de imagem ou clicar para selecionar"
                >
                  <ImagePlus className={cn(
                    'mx-auto h-12 w-12 mb-4 transition-colors',
                    isDragging ? 'text-primary' : 'text-muted-foreground'
                  )} />
                  <p className="text-sm font-medium mb-1">
                    {isDragging ? 'Solte a imagem aqui' : 'Arraste uma foto ou clique para selecionar'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPEG, PNG ou WebP • Máximo 2MB
                  </p>
                </div>
              )}

              {/* Preview Avatar */}
              {previewUrl && (
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <Avatar className="h-40 w-40 border-4 border-muted shadow-lg">
                        <AvatarImage
                          src={previewUrl}
                          alt="Preview da nova foto selecionada"
                          className="object-cover"
                        />
                        <AvatarFallback 
                          className="bg-primary text-4xl font-semibold text-primary-foreground"
                        >
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <button
                        type="button"
                        onClick={resetState}
                        className="absolute -right-2 -top-2 rounded-full bg-destructive p-2 text-destructive-foreground shadow-md hover:bg-destructive/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2"
                        aria-label="Cancelar seleção de foto"
                      >
                        <X className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  {selectedFile && (
                    <div className="bg-muted rounded-lg p-4 space-y-2">
                      <p className="text-sm font-medium">Arquivo selecionado:</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="truncate max-w-[200px]">{selectedFile.name}</span>
                        <span>{(selectedFile.size / 1024).toFixed(1)} KB</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Current Avatar Actions */}
              {!previewUrl && currentAvatarUrl && (
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-center">
                    <Avatar className="h-32 w-32 border-4 border-muted">
                      {resolvedAvatarUrl && (
                        <AvatarImage
                          key={resolvedAvatarUrl}
                          src={resolvedAvatarUrl}
                          alt="Foto de perfil atual"
                          className="object-cover"
                        />
                      )}
                      <AvatarFallback 
                        className="bg-primary text-3xl font-semibold text-primary-foreground"
                      >
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={openRemoveDialog}
                    disabled={isProcessing}
                    className="w-full"
                  >
                    <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
                    Remover foto atual
                  </Button>
                </div>
              )}

              {/* Status announcer for screen readers */}
              <div className="sr-only" role="status" aria-live="polite">
                {previewUrl && selectedFile && `Foto ${selectedFile.name} selecionada para upload`}
                {isUploading && 'Enviando foto, por favor aguarde'}
                {isDragging && 'Área de arrastar e soltar ativa'}
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-sm text-destructive w-full text-center" role="alert" aria-live="assertive">
                  {error}
                </p>
              )}

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                className="sr-only"
                aria-label="Selecionar arquivo de imagem para foto de perfil"
                tabIndex={-1}
              />
            </div>
          )}

          {!showCropper && previewUrl && (
            <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={resetState}
                disabled={isProcessing}
                className="w-full sm:w-auto"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCropper(true)}
                disabled={isProcessing}
                className="w-full sm:w-auto"
              >
                <Crop className="mr-2 h-4 w-4" aria-hidden="true" />
                Recortar
              </Button>
              <Button
                type="button"
                onClick={handleUpload}
                disabled={isProcessing || !selectedFile}
                className="w-full sm:w-auto"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" aria-hidden="true" />
                    Salvar foto
                  </>
                )}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {/* Remove Confirmation Dialog */}
      <AlertDialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover foto de perfil?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Sua foto de perfil será removida e suas iniciais serão exibidas no lugar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRemoving}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemove}
              disabled={isRemoving}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isRemoving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Removendo...
                </>
              ) : (
                'Remover'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AvatarUpload;
