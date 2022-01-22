import {SubstrateEvent} from "@subql/types";
import {SumReward} from "../types";
import {Balance} from "@polkadot/types/interfaces";


export async function handleSumRewarded(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, newReward]}} = event;
    let entity = await SumReward.get(account.toString());
    if (entity === undefined){
    entity = createSumReward(account.toString());
}
    entity.totalReward = entity.totalReward + (newReward as Balance).toBigInt();
    entity.blockheight = event.block.block.header.number.toNumber();
    await entity.save();
}
