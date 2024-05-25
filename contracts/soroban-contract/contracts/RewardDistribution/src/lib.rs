#[contracttype]
pub enum DataKey{
    Owner(Address),
    RewardPool,
    WorkerRewards(Address),
    correctVotes
}

#[contract]
pub struct RewardDistributionContract;

#[contractimpl]
impl RewardDistributionContract{
    pub fn new(env : &Env, owner : &Address, initial_reward_pool : u64) -> Result<(), String> {
        env.storage().persistent().set(&DataKey::Owner, &owner);
        env.storage().persistent().set(&DataKey :: RewardPool), &initial_reward_pool
        Ok(())
    }

    pub fn update_worker_votes(&self, env: &Env, worker: Address, correct_votes: u32) -> Result<(), String> {
        // Only the owner can update worker votes
        let owner = env.storage().persistent().get(&DataKey::Owner).unwrap();
        owner.require_auth();

        env.storage()
            .persistent()
            .set(&DataKey::WorkerVotes(worker), &correct_votes);

        Ok(())
    }

    pub fn distribute_rewards(&self, env: &Env) -> Result<(), String> {

        let owner = env.storage().persistent().get(&DataKey :: Owner).unwrap();
        owner.require_auth();

        let reward_pool = env.storage().persistent().get(&DataKey :: RewardPool).unwrap_or_default();
        let mut total_corrected_votes : u64 = 0;

        for key in env.storage().persistent().iter_keys(){
            if let DataKey :: WorkerVotes(_) = key {
                let correct_votes : u32 = env.storage().persistent().get(&key).unwrap_or_default();
                total_corrected_votes  += correct_votes as u64;
            }
        }

    

        let number_of_distribution = (workerAdress.len() as u64) * 3;


        let reward_pool_with_decimals = reward_pool * 10u64.pow(self.decimals as u32);
        let reward_per_correct_vote = reward_pool_with_decimals / num_workers;

        env.storage().persistent().set(&DataKey::RewardPool, &0);

        for key in env.storage().persistent.iter_keys(){
            if let DataKey::WorkerVotes(worker) = key {
                let correct_votes : u32 = env.storage().persistent().get(&key).unwrap_or_default();
                let mut worker_rewards : u64 = env.storage().persistent().get(&DataKey::WorkerVotes(worker.clone())).unwrap_or_default();
                worker_rewards += reward_per_vote * correct_votes as u64;
                env.storage().persistent().set(&DataKey::WorkerVotes(worker.clone()), &worker_rewards);
            }
        }
        Ok(())

    }

    pub fn claim_rewards(&self, env: &Env, worker : Address) -> Result<(), String> {
        worker.require_auth();

        let worker_rewards : u64 = env.storage().persistent().get(&DataKey::WorkerVotes(worker.clone())).unwrap_or_default();
        env.storage().persistent().set(&DataKey::WorkerVotes(worker), &0);
        Ok(worker_rewards / 10u64.pow(self.decimals as u32))
    }
}