interface StoredPack {
  id: number;
  slug: string;
  title: string;
  images: string[];
  timestamp: number;
}

export const packStorage = {
  savePack: (pack: StoredPack) => {
    try {
      localStorage.setItem('selectedPack', JSON.stringify(pack));
      return true;
    } catch (error) {
      console.error('Error saving pack:', error);
      return false;
    }
  },

  getPack: (): StoredPack | null => {
    try {
      const pack = localStorage.getItem('selectedPack');
      return pack ? JSON.parse(pack) : null;
    } catch (error) {
      console.error('Error getting pack:', error);
      return null;
    }
  },

  clearPack: () => {
    try {
      localStorage.removeItem('selectedPack');
      return true;
    } catch (error) {
      console.error('Error clearing pack:', error);
      return false;
    }
  }
};

// Also export the interface for use in other components
export type { StoredPack }; 