// Test script for Tic-Tac-Toe server
const { io } = require('socket.io-client');

let testsPassed = 0;
let testsFailed = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTests() {
  console.log('\n=== Tic-Tac-Toe Server Tests ===\n');
  
  // Test 1: Create room
  try {
    const client1 = io('http://localhost:3001', { transports: ['websocket'] });
    await waitForConnect(client1);
    
    return new Promise((resolve) => {
      client1.emit('create_room');
      
      client1.on('room_created', async (data) => {
        console.log(`✓ Test 1 PASSED: Room created with ID ${data.roomId}`);
        testsPassed++;
        const roomId = data.roomId;
        
        // Test 2: Join room
        const client2 = io('http://localhost:3001', { transports: ['websocket'] });
        await waitForConnect(client2);
        
        client2.emit('join_room', roomId);
        
        client2.on('room_joined', (data) => {
          console.log(`✓ Test 2 PASSED: Player joined room ${roomId} as ${data.symbol}`);
          testsPassed++;
          
          // Test 3: Make moves
          testGamePlay(roomId, client1, client2).then(() => {
            cleanup(client1, client2);
            printSummary();
            resolve();
          });
        });
      });
    });
  } catch (error) {
    console.error(`✗ Test FAILED: ${error.message}`);
    testsFailed++;
  }
}

async function waitForConnect(socket) {
  return new Promise(resolve => {
    socket.on('connect', resolve);
  });
}

async function testGamePlay(roomId, client1, client2) {
  // Player X makes move at index 0
  await sleep(100);
  client1.emit('make_move', { roomId, index: 0 });
  
  await waitForEvent(client1, 'move_made');
  console.log(`✓ Test 3 PASSED: Move made by X at index 0`);
  testsPassed++;
  
  // Player O makes move at index 4
  await sleep(100);
  client2.emit('make_move', { roomId, index: 4 });
  
  await waitForEvent(client2, 'move_made');
  console.log(`✓ Test 4 PASSED: Move made by O at index 4`);
  testsPassed++;
  
  // Player X makes move at index 1
  await sleep(100);
  client1.emit('make_move', { roomId, index: 1 });
  
  await waitForEvent(client1, 'move_made');
  console.log(`✓ Test 5 PASSED: Move made by X at index 1`);
  testsPassed++;
  
  // Player O makes move at index 3
  await sleep(100);
  client2.emit('make_move', { roomId, index: 3 });
  
  await waitForEvent(client2, 'move_made');
  console.log(`✓ Test 6 PASSED: Move made by O at index 3`);
  testsPassed++;
  
  // Player X makes move at index 2 (winning move)
  await sleep(100);
  client1.emit('make_move', { roomId, index: 2 });
  
  await waitForEvent(client1, 'move_made');
  console.log(`✓ Test 7 PASSED: Winning move made by X at index 2`);
  testsPassed++;
}

function waitForEvent(socket, event) {
  return new Promise(resolve => {
    socket.on(event, resolve);
  });
}

function cleanup(...clients) {
  clients.forEach(client => client.disconnect());
}

function printSummary() {
  console.log(`\n=== Test Summary ===`);
  console.log(`Passed: ${testsPassed}`);
  console.log(`Failed: ${testsFailed}`);
  process.exit(testsFailed > 0 ? 1 : 0);
}

runTests().catch(error => {
  console.error('Test error:', error.message);
  testsFailed++;
  printSummary();
});
