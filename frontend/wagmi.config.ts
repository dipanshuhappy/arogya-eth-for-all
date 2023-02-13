import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';
export default defineConfig({
  out: 'src/web3Hooks/hooks.ts',
  plugins: [react({})],
});
