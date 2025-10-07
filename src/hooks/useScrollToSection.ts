import { useCallback } from 'react';

export const useScrollToSection = () => {
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // The 'pt-[76px]' in App.tsx creates a top padding. We need to account for this.
      const headerOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return { scrollToSection };
};