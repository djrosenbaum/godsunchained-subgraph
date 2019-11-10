import { BigInt, log } from "@graphprotocol/graph-ts"
import {
  Contract,
  ProtoUpdated,
  SeasonStarted,
  QualityChanged,
  CardsMinted,
  ClassPropertySet,
  TokenPropertySet,
  Transfer,
  Approval,
  ApprovalForAll,
  OwnershipTransferred
} from "../generated/Contract/Contract"
import { Owner, Token } from "../generated/schema"

// export function handleProtoUpdated(event: ProtoUpdated): void {}

// export function handleSeasonStarted(event: SeasonStarted): void {}

// export function handleQualityChanged(event: QualityChanged): void {}

// export function handleCardsMinted(event: CardsMinted): void {}

// export function handleClassPropertySet(event: ClassPropertySet): void {}

// export function handleTokenPropertySet(event: TokenPropertySet): void {}

// This will work
// let numbers = entity.numbers
// numbers.push(BigInt.fromI32(1))
// entity.numbers = numbers
// entity.save()

export function handleTransfer(event: Transfer): void {
    let tokenId = event.params.tokenId.toString();
    let token = new Token(tokenId);

    let ownerId = event.params.to.toHexString();
    let owner = new Owner(ownerId);

    let contract = Contract.bind(event.address);

    let details = contract.getDetails(event.params.tokenId);
    token.proto = details.value0;
    token.quality = details.value1;
    token.owner = ownerId;

    let balance = contract.balanceOf(event.params.to);
    owner.balance = balance;

    token.save();
    owner.save();
}

// export function handleApproval(event: Approval): void {}

// export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
