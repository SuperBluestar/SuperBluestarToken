const { expect } = require("chai");
const { artifacts, web3 } = require("hardhat");
const SuperBluestarToken = artifacts.require("SuperBluestarToken");

describe("SuperBluestarToken contract | Testing by chai", function () {
    let SBToken;
    let minter, addr1, addr2, addrs;

    const initialTotalSupply = 10**10;
    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        // SBT = await ethers.getContractFactory("SuperBluestarToken");
        [minter, addr1, addr2, addrs] = await web3.eth.getAccounts();

        // To deploy our contract, we just have to call Token.deploy() and await
        // for it to be deployed(), which happens once its transaction has been
        // mined.
        SBToken = await SuperBluestarToken.new(initialTotalSupply);
    });
    describe("Deployment", function () {
        it("Should have right token name and symbol", async function () {
            expect(await SBToken.name()).to.equal("SuperBluestarToken");
            expect(await SBToken.symbol()).to.equal("SBT");
        });
        it("Should have right initial total number of tokens", async function () {
            expect((await SBToken.totalSupply()).toNumber()).to.equal(initialTotalSupply);
        });
        it("Should have right owner", async function () {
            expect(await SBToken.owner()).to.equal(minter);
        });
    });

    describe("Transaction", function () {
        it("Should have correct amount of tokens after transfer", async function () {
            await SBToken.transfer(addr1, 10000);
            expect((await SBToken.balanceOf(minter)).toNumber()).to.equal(initialTotalSupply - 10000);
            expect((await SBToken.balanceOf(addr1)).toNumber()).to.equal(10000);
            await SBToken.transfer(addr2, 5000, {from: addr1});
            expect((await SBToken.balanceOf(addr1)).toNumber()).to.equal(5000);
            expect((await SBToken.balanceOf(addr2)).toNumber()).to.equal(5000);
        });
        it("Owner is able to mint", async function () {
            await SBToken.mint(5000, { from: minter })
            await SBToken.transfer(addr1, 5000, { from: minter })
            expect((await SBToken.totalSupply()).toNumber()).to.equal(initialTotalSupply + 5000);
            expect((await SBToken.balanceOf(addr1)).toNumber()).to.equal(5000);
            
            // expect(SBToken.mint(5000, { from: addr1 })).to.be.reverted;
        })
    });
});