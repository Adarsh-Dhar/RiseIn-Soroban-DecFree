#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env};

#[contracttype]
pub enum DataKey {
    Owner,
    Client,
    RewardPool,
    VotingDeadline,
    WorkerVotes(Address),
    RequiredSkills
}

#[contract]
pub struct GithubVotingContract{
    decimals : u8;
}

#[contractimpl]
impl GithubVotingContract {
    pub fn new(env : &Env, owner: Address, client: Address, initial_reward_pool: u64, projectIdea){
        env.storage().persistent().set(&DataKey::Owner, &owner);
        env.storage().persistent().set(&DataKey::Client, &client);
        env.storage().persistent().set(&DataKey::RewardPool, &initial_reward_pool);
        env.storage().persistent().set(&DataKey::RequiredSkills, &required_skills);
        env.storage().persistent().set(&DataKey::VotingDeadline, &voting_deadline);

        let contract = GithubVotingContract{decimals}
        contract.instantiate(env)

    }

    pub fn vote(&self, env: &Env, worker : Address, skills : Vec<String>) -> Result<(), String> {
        let voting_deadline : TimeBound = env.storage().persistent().get(&DataKey::VotingDeadline).unwrap()
        if env.get_time() > voting_deadline { 
            return Err("Voting deadline has passed").to_string()

            env.storage().persistent().set(&DataKey :: WorkerVotes(worker),&skills);

            Ok(())
        }
    }

    pub fn get_worker_vote(&self, env : &Env , worker : Address) -> Result<Vec<String>, String> {

        worker.require_auth();
        
        let worker_skills : Vec<String> = env.storage().persistent().get(&DataKey :: WorkerVotes(worker.clone())).unwrap_or_default();

        Ok(worker_skills)
    }

        
}