#[cfg(test)]
mod tests {
    use super::*;
    use soroban_sdk::{
        mock::{env::MockEnv, symbol_short},
        Address, AuthorizedFunction, AuthorizedInvocation,
    };

    #[test]
    fn test_atomic_swap() {
        // Mock environment
        let mut env = MockEnv::new();

        // Addresses
        let freelancer= Address::from("address_a");
        let worker = Address::from("address_b");
        let token= Address::from("tokenddress_a");

        // Initialize the swap contract
        let contract = AtomicSwapContract {};

        // Perform the swap operation
        contract.swap(
            env.clone(),
            freelancer.clone(),
            worker.clone(),
            token.clone(),
            1000, // Amount of token freelancerto transfer from freelancerto b
        );

        // Expected authorization checks
        assert_eq!(
            env.auths(),
            vec![
                (
                    freelancer.clone(),
                    AuthorizedInvocation {
                        function: AuthorizedFunction::Contract((
                            contract.current_contract_address(),
                            symbol_short!("swap"),
                            (
                                token.clone(),
                                1000_i128,
                            )
                                .into_val(&env),
                        )),
                        sub_invocations: vec![
                            AuthorizedInvocation {
                                function: AuthorizedFunction::Contract((
                                    token.clone(),
                                    symbol_short!("transfer"),
                                    (freelancer.clone(), worker.clone(), 1000_i128,).into_val(&env),
                                )),
                                sub_invocations: vec![]
                            }
                        ]
                    }
                ),
                (
                    worker.clone(),
                    AuthorizedInvocation {
                        function: AuthorizedFunction::Contract((
                            contract.current_contract_address(),
                            symbol_short!("swap"),
                            (
                                token.clone(),
                                1000_i128,
                            )
                                .into_val(&env),
                        )),
                        sub_invocations: vec![]
                    }
                )
            ]
        );
    }
}
