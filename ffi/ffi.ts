import { dlopen, FFIType, suffix } from "bun:ffi"

const lib = dlopen(`ffi/target/release/libffi.${suffix}`, {
  _get_auth_crypto_key: {
    args: [FFIType.bool],
    returns: FFIType.cstring,
  },
})

export function getAuthCryptoKey(isDev: boolean): string {
  return lib.symbols._get_auth_crypto_key(isDev).toString()
}