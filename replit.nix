{ pkgs }: {
  deps = [
    pkgs.python310Full        # Specify your Python version
    pkgs.nodejs-18_x          # Specify your Node.js version
    pkgs.gvm-libs             # Provides libstdc++.so.6
    # Add other system packages if needed
  ];
}
