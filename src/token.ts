import { BigInt } from "@graphprotocol/graph-ts"
import {
  CardsMinted,
} from "../generated/Contract/Contract"
import { Owner, Token } from "../generated/schema"

// export function handleProtoUpdated(event: ProtoUpdated): void {}

// export function handleSeasonStarted(event: SeasonStarted): void {}

// export function handleQualityChanged(event: QualityChanged): void {}

export function handleCardsMinted(event: CardsMinted): void {
  let start = event.params.start;
  let protos = event.params.protos;
  let qualities = event.params.qualities;
  let to = event.params.to;

  // log.debug('Start: {}, Protos: {}, Qualities: {}, To: {}', [start.toString(), BigInt.fromI32(protos.length).toString(), BigInt.fromI32(qualities.length).toString(), to.toHexString()])

  let protoLength = BigInt.fromI32(protos.length);

  let ownerId = to.toHexString();
  let owner = Owner.load(ownerId);
  if (owner == null) {
    owner = new Owner(ownerId);
    owner.balance = protoLength;
  } else {
    owner.balance = owner.balance.plus(protoLength);
  }

  for (let i = 0; i < protos.length; i++) {
    let index = BigInt.fromI32(i);
    let tokenId = start.plus(index);
    let token = new Token(tokenId.toString());
    token.proto = protos[i];
    token.quality = qualities[i];
    token.owner = ownerId;

    token.save();
  }

  owner.save();
}

// export function handleClassPropertySet(event: ClassPropertySet): void {}

// export function handleTokenPropertySet(event: TokenPropertySet): void {}

// export function handleTransfer(event: Transfer): void {
//     let tokenId = event.params.tokenId.toString();
//     let token = new Token(tokenId);

//     let ownerId = event.params.to.toHexString();
//     let owner = new Owner(ownerId);

//     let contract = Contract.bind(event.address);

//     let details = contract.getDetails(event.params.tokenId);
//     token.proto = details.value0;
//     token.quality = details.value1;
//     token.owner = ownerId;

//     let balance = contract.balanceOf(event.params.to);
//     owner.balance = balance;

//     token.save();
//     owner.save();
// }

// export function handleApproval(event: Approval): void {}

// export function handleApprovalForAll(event: ApprovalForAll): void {}

// export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
