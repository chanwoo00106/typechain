import * as crypto from 'crypto'

interface BlockShape {
  hash: string
  prevHash: string
  height: number
  data: string
}

class Block implements BlockShape {
  public hash: string

  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data)
  }

  static calculateHash(prevHash: string, height: number, data: string): string {
    const toHash = `${prevHash}${height}${data}`
    return crypto.createHash('sha256').update(toHash).digest('hex')
  }
}

class Blockchain {
  private blocks: Block[]

  constructor() {
    this.blocks = []
  }

  private getPrevHash(): string {
    const hash = this.blocks.at(-1)?.hash
    if (!hash) return ''
    return hash
  }

  public addBlock(data: string) {
    const block = new Block(this.getPrevHash(), this.blocks.length + 1, data)
    this.blocks.push(block)
  }

  public getBlocks() {
    return [...this.blocks]
  }
}

const blockchain = new Blockchain()

blockchain.addBlock('First one')
blockchain.addBlock('Second one')
blockchain.addBlock('Third one')

console.log(blockchain.getBlocks())
