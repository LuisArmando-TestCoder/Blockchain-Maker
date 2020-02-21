class getBlockchain {
    lastHash; // watch out
    chain;

    constructor(genesisData) {
        this.lastHash = this.getDataHash(genesisData); // watch out
        this.chain = {
            [this.lastHash]: Object.assign({
                data: genesisData
            }, {
                currentHash: this.lastHash
            })
        };
    }

    getDataHash(data) {
        const JSONLikeData = JSON.stringify(data);
        let hash = 0;
        for (let i = 0; i < JSONLikeData.length; i++) {
            const character = JSONLikeData.charCodeAt(i);
            hash = ((hash << 5) - hash) + character;
            hash = hash & hash;
        }
        return hash;
    }

    setBlock(data) {
        const previousHash = this.lastHash;
        const currentHash = this.getDataHash(
            Object.assign({
                data
            }, {
                previousHash
            })
        );

        this.lastHash = currentHash;

        this.chain[currentHash] = Object.assign({
            data
        }, {
            currentHash
        });

        return this.chain[currentHash];
    }

    getBlock(hash) {
        return this.chain[hash];
    }
}

// console.clear();
const bc = new getBlockchain('Testcoder');
bc.setBlock([73]);
bc.setBlock([42]);
console.log(bc.chain);