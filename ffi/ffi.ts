import { dlopen, FFIType } from "bun:ffi"

// @ts-ignore next-line will be replaced by Bun with path valid after bundling
import binaryPath from "./target/ffi-binary" with { type: "file" }
// note: build process needs to be run via `bun run build-ffi` to ensure the binary is renamed correctly

const lib = dlopen(binaryPath, {
  _get_auth_crypto_key: {
    args: [FFIType.bool],
    returns: FFIType.cstring,
  },
})

export function getAuthCryptoKey(isDev: boolean): string {
  return lib.symbols._get_auth_crypto_key(isDev).toString()
}