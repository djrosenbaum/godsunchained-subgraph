import { BigInt } from "@graphprotocol/graph-ts"
import {
  CardsMinted,
} from "../generated/GodsUnchained_01/GodsUnchained_01"
import { Owner, Token, Proto, Quality } from "../generated/schema"

export function handleCardsMinted(event: CardsMinted): void {
  let to = event.params.to;
  let start = event.params.start;
  let protos = event.params.protos;
  let qualities = event.params.qualities;

  let ownerId = to.toHexString();
  let owner = Owner.load(ownerId);
  if (owner == null) {
    owner = new Owner(ownerId);
    owner.save();
  }

  for (let i = 0; i < protos.length; i++) {
    let index = BigInt.fromI32(i);
    let tokenId = start.plus(index);
    let token = new Token(tokenId.toString());
    let protoId = BigInt.fromI32(protos[i]).toString();
    let qualityId = BigInt.fromI32(qualities[i]).toString();
    token.proto = protoId;
    token.quality = qualityId;
    token.owner = ownerId;

    token.save();

    let proto = new Proto(protoId);
    proto.save();

    let quality = new Quality(qualityId);
    quality.save();
  }
}
