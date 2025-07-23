// This script renames the compiled FFI binary to a consistent name
// It should be run after building the FFI library with `cargo build --release`
// This is necessary to ensure that the path to the binary is consistent across different platforms
// and can be imported with at static path from ffi.ts

// rename ffi.dll (win)
try {
    require("fs").renameSync("./target/release/ffi.dll", "./target/ffi-binary");
    console.log("Renamed target/release/ffi.dll to target/ffi-binary");
    process.exit(0);
} catch {}

// rename libffi.so (linux)
try {
    require("fs").renameSync("./target/release/libffi.so", "./target/ffi-binary");
    console.log("Renamed target/release/libffi.so to target/ffi-binary");
    process.exit(0);
} catch {}

// rename libffi.dylib (macos)
try {
    require("fs").renameSync("./target/release/libffi.dylib", "./target/ffi-binary");
    console.log("Renamed target/release/libffi.dylib to target/ffi-binary");
    process.exit(0);
} catch {}

console.error("Failed to rename ffi binary.");