import * as crypto from 'crypto'

interface BlockShape {
  hash: string
  prevHash: string
  height: string
  data: string
}

class Block implements BlockShape {
  public hash: string

  constructor(
    public prevHash: string,
    public height: string,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data)
  }

  static calculateHash(prevHash: string, height: string, data: string): string {
    const toHash = `${prevHash}${height}${data}`
    return crypto.createHash('sha256').update(toHash).digest('hex')
  }
}
