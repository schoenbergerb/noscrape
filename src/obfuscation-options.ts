import { EncryptionCharacterRange } from ".";

export interface ObfuscationOptions {

  /**
   * obfuscation strength multiplier ( default: 1 )
   * all under 0.1 makes no sense ( can simply be rounded and so back calculated )
   * all over 10 makes no sense ( looks like 💩 )
   */
  strength?: number;

  /**
   *  the character-range to pick obfuscation glyphs from
   */
  characterRange?: EncryptionCharacterRange;

}
