var ref = require('ref');
var Struct = require("ref-struct");
var ffi = require('ffi');

var stringPtr = ref.refType(ref.types.CString);

var ptr = ref.refType(ref.types.void);

var ExternResult = Struct({
    'tick' : 'int',
    'result' : 'int'
});

var Position = Struct({
    'x' : 'float',
    'y' : 'float'
});

const bot1 = (x) => {
    return;
}

const bot_tick = ffi.Callback('void', ['int'], bot1);

var yare = ffi.Library('yareio', {
    base_count: [ref.types.uint32, [
    ]],
    base_current_spirit_cost: [ref.types.int32, [
      ref.types.uint32,
    ]],
    base_energy_capacity: [ref.types.int32, [
      ref.types.uint32,
    ]],
    base_energy: [ref.types.int32, [
      ref.types.uint32,
    ]],
    base_hp: [ref.types.uint32, [
      ref.types.uint32,
    ]],
    base_player_id: [ref.types.uint32, [
      ref.types.uint32,
    ]],
    base_position: [Position, [
      ref.types.uint32,
    ]],
    outpost_count: [ref.types.uint32, [
    ]],
    outpost_energy_capacity: [ref.types.int32, [
      ref.types.uint32,
    ]],
    outpost_energy: [ref.types.int32, [
      ref.types.uint32,
    ]],
    outpost_player_id: [ref.types.uint32, [
      ref.types.uint32,
    ]],
    outpost_position: [Position, [
      ref.types.uint32,
    ]],
    outpost_range: [ref.types.float, [
      ref.types.uint32,
    ]],
    player_count: [ref.types.uint32, [
    ]],
    player_me: [ref.types.uint32, [
    ]],
    spirit_count: [ref.types.uint32, [
    ]],
    spirit_divide: [ref.types.void, [
      ref.types.uint32,
    ]],
    spirit_energize_base: [ref.types.void, [
      ref.types.uint32,
      ref.types.uint32,
    ]],
    spirit_energize_outpost: [ref.types.void, [
      ref.types.uint32,
      ref.types.uint32,
    ]],
    spirit_energize: [ref.types.void, [
      ref.types.uint32,
      ref.types.uint32,
    ]],
    spirit_energy_capacity: [ref.types.int32, [
      ref.types.uint32,
    ]],
    spirit_energy: [ref.types.int32, [
      ref.types.uint32,
    ]],
    spirit_explode: [ref.types.void, [
      ref.types.uint32,
    ]],
    spirit_goto: [ref.types.void, [
      ref.types.uint32,
      ref.types.float,
      ref.types.float,
    ]],
    spirit_hp: [ref.types.uint32, [
      ref.types.uint32,
    ]],
    spirit_id: [ref.types.int32, [
      ref.types.uint32,
    ]],
    spirit_jump: [ref.types.void, [
      ref.types.uint32,
      ref.types.float,
      ref.types.float,
    ]],
    spirit_merge: [ref.types.void, [
      ref.types.uint32,
      ref.types.uint32,
    ]],
    spirit_position: [Position, [
      ref.types.uint32,
    ]],
    spirit_shout: [ref.types.void, [
      ref.types.uint32,
      ref.types.CString,
    ]],
    spirit_shape: [ref.types.uint32, [
      ref.types.uint32,
    ]],
    spirit_size: [ref.types.int32, [
      ref.types.uint32,
    ]],
    star_active_at: [ref.types.uint32, [
      ref.types.uint32,
    ]],
    star_count: [ref.types.uint32, [
    ]],
    star_energy_capacity: [ref.types.int32, [
      ref.types.uint32,
    ]],
    star_energy: [ref.types.int32, [
      ref.types.uint32,
    ]],
    star_position: [Position, [
      ref.types.uint32,
    ]],
    headless_init: [ref.refType(ref.types.int32), [
      ptr,
      ref.types.uint32,
      ptr,
      ref.types.uint32,
      'char *',
    ]],
    headless_update_env: [ref.types.void, [
      ptr,
    ]],
    headless_gather_commands: [ref.types.void, [
      ptr,
      ref.types.uint32,
    ]],
    headless_process_commands: [ExternResult, [
      ptr,
    ]],
    headless_free: [ref.types.void, [
      ptr,
    ]],
  });






var maxStringLength = 200;
var theStringBuffer = new Buffer(maxStringLength);
theStringBuffer.fill(0); //if you want to initially clear the buffer
theStringBuffer.write("replay.json", 0, "utf-8");

var sim = yare.headless_init(bot_tick, 0, bot_tick, 0, theStringBuffer);
var res = null;
var result = -1;

while(result < 0){
    yare.headless_update_env(sim);
    yare.headless_gather_commands(sim, 0);
    yare.headless_gather_commands(sim, 1);
    res = yare.headless_process_commands(sim);
    console.log(yare.spirit_count());
    result = res.result;
}

yare.headless_free(sim);
