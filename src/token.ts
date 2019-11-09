import { BigInt } from "@graphprotocol/graph-ts"
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
import { Token } from "../generated/schema"

// export function handleProtoUpdated(event: ProtoUpdated): void {}

// export function handleSeasonStarted(event: SeasonStarted): void {}

// export function handleQualityChanged(event: QualityChanged): void {}

// export function handleCardsMinted(event: CardsMinted): void {}

// export function handleClassPropertySet(event: ClassPropertySet): void {}

// export function handleTokenPropertySet(event: TokenPropertySet): void {}

// export function handleNewGravatar(event: NewGravatar): void {
//   let gravatar = new Gravatar(event.params.id.toHex())
//   gravatar.owner = event.params.owner
//   gravatar.displayName = event.params.displayName
//   gravatar.imageUrl = event.params.imageUrl
//   gravatar.save()
// }

export function handleTransfer(event: Transfer): void {
    let id = event.params.tokenId.toString();

    let token = Token.load(id) || new Token(id);

    token.owner = event.params.to;

    let contract = Contract.bind(event.address);

    let details = contract.getDetails(event.params.tokenId);
    token.proto = details.value0;
    token.quality = details.value1;

    token.save();
}

// export function handleApproval(event: Approval): void {}

// export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
