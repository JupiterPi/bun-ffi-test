use std::ffi::{CString, c_char};
use rand::RngCore;
use keyring::Entry;

#[unsafe(no_mangle)]
pub extern "C" fn _get_auth_crypto_key(is_dev: bool) -> *const c_char {
    let crypto_key = get_auth_crypto_key(is_dev).expect("Failed to read or generate crypto key");
    CString::new(crypto_key).expect("Failed to create CString").into_raw()
}

fn get_auth_crypto_key(is_dev: bool) -> Result<String, keyring::Error> {
    let entry = Entry::new(if is_dev { "filen-cli-dev" } else { "filen-cli" }, "auth-config-crypto-key")?;
    if let Ok(existing_password) = entry.get_password() {
        Ok(existing_password)
    } else {
        let password = generate_crypto_key();
        entry.set_password(&password)?;
        Ok(password)
    }
}

fn generate_crypto_key() -> String {
    let mut rng = rand::thread_rng();
    let mut random_bytes = [0u8; 32];
    rng.fill_bytes(&mut random_bytes);
    hex::encode(&random_bytes)
}