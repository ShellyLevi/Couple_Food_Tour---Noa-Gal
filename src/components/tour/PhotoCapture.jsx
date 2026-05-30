import React, { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTour } from '@/lib/tourContext';

export default function PhotoCapture({ stationId, onPhotoAdded, photoCount }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const { addPhoto } = useTour();

  const handleCapture = (e) => {
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
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        onChange={handleCapture}
        className="hidden"
        aria-label="צלם תמונה"
      />

      <Button
        size="lg"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg font-bold shadow-lg gap-3 w-full"
      >
        <Camera className="w-6 h-6" />
        {uploading ? 'שומר...' : photoCount === 0 ? 'צלמו תמונה 📸' : '+ הוסיפו עוד תמונה 📸'}
      </Button>

      {photoCount > 0 && (
        <p className="text-xs text-muted-foreground">
          {photoCount} תמונות — אפשר להוסיף עוד! ✨
        </p>
      )}
    </div>
  );
}
