import React, { useRef, useState } from 'react';
import { Camera, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTour } from '@/lib/tourContext';

export default function PhotoCapture({ stationId, onPhotoAdded, photoCount }) {
  const cameraRef = useRef(null);
  const galleryRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const { addPhoto } = useTour();

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target.result;
        addPhoto(stationId, dataUrl);
        if (onPhotoAdded) onPhotoAdded(dataUrl);
      };
      reader.readAsDataURL(file);
    });

    setTimeout(() => setUploading(false), 500);
    e.target.value = '';
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {/* קלט מצלמה */}
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        onChange={handleFiles}
        className="hidden"
      />
      {/* קלט גלריה */}
      <input
        ref={galleryRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        className="hidden"
      />

      <div className="flex gap-2 w-full">
        <Button
          size="lg"
          onClick={() => cameraRef.current?.click()}
          disabled={uploading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-5 text-base font-bold shadow-lg gap-2 flex-1"
        >
          <Camera className="w-5 h-5" />
          צלם 📸
        </Button>

        <Button
          size="lg"
          onClick={() => galleryRef.current?.click()}
          disabled={uploading}
          className="bg-white hover:bg-white/90 text-foreground border-2 border-primary/30 rounded-full py-5 text-base font-bold shadow-lg gap-2 flex-1"
        >
          <Image className="w-5 h-5" />
          גלריה 🖼️
        </Button>
      </div>

      {photoCount > 0 && (
        <p className="text-xs text-muted-foreground">
          {photoCount} תמונות — אפשר להוסיף עוד! ✨
        </p>
      )}
    </div>
  );
}
