// Import NextUI Button component
import { Button } from '@nextui-org/react';

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to NFT Marketplace</h1>
      {/* Add NextUI Button */}
      <Button color="primary" variant="flat">
        Test Button
      </Button>

      <Button color="primary" variant="faded">
        Faded
      </Button>  
    </div>
  );
}
