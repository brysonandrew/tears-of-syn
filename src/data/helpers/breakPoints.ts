export const breakPoints = {
    mobile: 500,
    tablet: 1000,
    laptop: 1440
};

export const breakPointTests = {
    isMobile: (width: number) => width < breakPoints.mobile,
    isTablet: (width: number) => width < breakPoints.tablet,
    isLaptop: (width: number) => width < breakPoints.laptop,
};

export const fontSize = {
    S: (isMobile, isTablet, isLaptop) => isMobile ?  10 : isTablet ? 12 : isLaptop ? 14 : 18,
    M: (isMobile, isTablet, isLaptop) => isMobile ?  12 : isTablet ? 14 : isLaptop ? 16 : 20,
    L: (isMobile, isTablet, isLaptop) => isMobile ?  14 : isTablet ? 16 : isLaptop ? 18 : 22,
    XL: (isMobile, isTablet, isLaptop) => isMobile ?  16 : isTablet ? 18 : isLaptop ? 22 : 28,
    XXL: (isMobile, isTablet, isLaptop) => isMobile ? 18 : isTablet ? 20 : isLaptop ? 28 : 40,
    XXXL: (isMobile, isTablet, isLaptop) => isMobile ? 40 : isTablet ? 80 : 195,
};

export const padding = {
    M: (isMobile, isTablet, isLaptop) => isMobile ? 5 : isTablet ? 6 : isLaptop ? 8 : 10,
    L: (isMobile, isTablet, isLaptop) => isMobile ? 10 : isTablet ? 12 : isLaptop ? 16 : 20,
    XXL: (isMobile, isTablet, isLaptop) => isMobile ? 20 : isTablet ? 24 : isLaptop ? 32 : 40,
};

export const margin = {
    L: (isMobile, isTablet, isLaptop) => isMobile ? 10 : isTablet ? 12 : isLaptop ? 16 : 20,
    XXL: (isMobile, isTablet, isLaptop) => isMobile ? 20 : isTablet ? 24 : isLaptop ? 32 : 40,
};
