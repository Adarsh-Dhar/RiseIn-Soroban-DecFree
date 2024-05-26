#![no_std]
use soroban_sdk::{contract, contractimpl, token, Address, Env, IntoVal};

#[contract]
pub struct DistributeFunds ;

#[contractimpl]
impl DistributeFunds {
    // Swap token A from `a` to `b`
    pub fn swap(
        env: Env,
        freelancer: Address,
        worker: Address,
        token: Address,
        amount: i128,
    ) {
        // Ensure `a` is authorized for the transfer
        freelancer.require_auth_for_args((token.clone(), amount).into_val(&env));

        // Perform the token transfer from `a` to `b`
        move_token(&env, &token, &freelancer, &worker, amount);
    }
}

fn move_token(
    env: &Env,
     from: &Address,
    to: &Address,
    token: &Address,
    transfer_amount: i128,
) {
    let token = token::Client::new(env, token);
    let contract_address = env.current_contract_address();

    // Transfer tokens from `from` to `to`
    token.transfer(from, to, &transfer_amount);
}
