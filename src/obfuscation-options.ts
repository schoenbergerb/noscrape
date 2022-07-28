import { EncryptionCharacterRange } from "./encryption-character-range.enum";

export interface ObfuscationOptions {
  /**
   * optional: obfuscation strength multiplier (default: 1)
   * all under 0.1 makes no sense (can simply be rounded and so back calculated)
   * all over 10 makes no sense (looks like 💩)
   */
  strength?: number;

  /**
   *  optional: the character-range to pick obfuscation glyphs from
   */
  characterRange?: EncryptionCharacterRange;

  /**
   * optional: lowMemory option
   * use if to less memory availible for loading font
   */
   lowMemory?: boolean;
}

interface ObfuscationDefaultOptions extends ObfuscationOptions {
  strength: number;
  characterRange: EncryptionCharacterRange;
  lowMemory: boolean;
}

export const DEFAULT_OPTIONS: ObfuscationDefaultOptions = {
  strength: 1,
  characterRange: EncryptionCharacterRange.PRIVATE_USE_AREA,
  lowMemory: false,
}	