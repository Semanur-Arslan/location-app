export const getColoredMarkerIcon = (
  color: string
): google.maps.Icon | undefined => {
  if (typeof window !== "undefined" && window.google?.maps) {
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 48">
            <path fill="${color}" stroke="white" stroke-width="2"
              d="M16 0C7.163 0 0 7.163 0 16c0 11.598 16 32 16 32s16-20.402 16-32C32 7.163 24.837 0 16 0zM16 22a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"/>
          </svg>
        `)}`,
      scaledSize: new window.google.maps.Size(32, 48),
    };
  }
  return undefined;
};
