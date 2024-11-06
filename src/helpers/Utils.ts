export class Utils {
  // Function to convert a hex color to RGB
  static hexToRgb(hex: string): { r: number; g: number; b: number } {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
  }

  // Function to generate a unique ID
  static generateUUID(): string {
    // Simple UUID generation
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      /* eslint-disable */
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      /* eslint-enable */
      return v.toString(16);
    });
  }

  // Function to compare two arrays for equality
  static arraysEqual(a: any[], b: any[]): boolean {
    if (a.length !== b.length) return false;
    a.sort();
    b.sort();
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  // Function to parse molecular formulas
  static parseFormula(formula: string): { [key: string]: number } {
    const elementCounts: { [key: string]: number } = {};
    const regex = /([A-Z][a-z]?)(\d*)/g;
    let match;
    while ((match = regex.exec(formula)) !== null) {
      const element = match[1];
      const count = parseInt(match[2]) || 1;
      elementCounts[element] = (elementCounts[element] || 0) + count;
    }
    return elementCounts;
  }
}
