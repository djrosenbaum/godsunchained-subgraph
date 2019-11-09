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

export function handleProtoUpdated(event: ProtoUpdated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Token.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new Token(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.id = BigInt.fromI32(event.params.id).toString()

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.supportsInterface(...)
  // - contract.cardQualities(...)
  // - contract.mythicTradable(...)
  // - contract.name(...)
  // - contract.getApproved(...)
  // - contract.totalSupply(...)
  // - contract.addressToUserID(...)
  // - contract.mythicApproved(...)
  // - contract.factoryApproved(...)
  // - contract.MYTHIC_THRESHOLD(...)
  // - contract.getTokenKey(...)
  // - contract.getClassKey(...)
  // - contract.getBatch(...)
  // - contract.mintCard(...)
  // - contract.ownerOf(...)
  // - contract.userIDToAddress(...)
  // - contract.baseURI(...)
  // - contract.balanceOf(...)
  // - contract.getBatchStart(...)
  // - contract.startSeason(...)
  // - contract.owner(...)
  // - contract.isOwner(...)
  // - contract.symbol(...)
  // - contract.tokenCount(...)
  // - contract.getClassProperty(...)
  // - contract.protos(...)
  // - contract.seasonTradable(...)
  // - contract.batches(...)
  // - contract.protoToSeason(...)
  // - contract.getDetails(...)
  // - contract.properties(...)
  // - contract.tokenURI(...)
  // - contract.mintCards(...)
  // - contract.getProperty(...)
  // - contract.mythicCreated(...)
  // - contract.isTradable(...)
  // - contract.propertyManager(...)
  // - contract.nextBatch(...)
  // - contract.isApprovedForAll(...)
  // - contract.cardProtos(...)
  // - contract.batchSize(...)
  // - contract.seasons(...)
}

export function handleSeasonStarted(event: SeasonStarted): void {}

export function handleQualityChanged(event: QualityChanged): void {}

export function handleCardsMinted(event: CardsMinted): void {}

export function handleClassPropertySet(event: ClassPropertySet): void {}

export function handleTokenPropertySet(event: TokenPropertySet): void {}

export function handleTransfer(event: Transfer): void {}

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
