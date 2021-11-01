const Discord = require("discord.js");
require("discord-reply");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(db.get('prefix')))return;  
  let begEmbed = new Discord.MessageEmbed().setColor("#009933");
  let secret = 0;
  const amount = Math.floor(Math.random()*5) + 5;
  const adjective = [
    '', ' Depressed', ' Happy', ' Confused', 'n Enlightened', 
    ' Corrupted', ' Strange', ' Putrid', ' Group Of', 
    ' Miniature', ' Flying', ' Mythical', ' Weirded Out', 
    ' Peacable', ' Funny', ' Cunning', ' Young', 'n Old',
    ' Capable', ' Dubious', ' Half Of A', ' Piece Of A',
    ' W i d e', ' Suspicious', ' Slow', ' Sus', ' Hungry',
    'n Inquisitive', 'n Angry', ` Level ${Math.floor(Math.random() * 101)}`,
    ' Quantum', ' Rich', ' Poor', ' Communist', ' Smooth', 
    'n Anime', ' Loud', ' Drippy', 'n Irritable', ' Bald', ' Team Of',
    ' Vegan', ' Shifty', ' Sneaky', ' Dirty', ' Deplorable',
    ' Funny Looking', ' Short', ' Tall', ' Homeless', ' Green',
    ' C h e e s e', ' Crimson', ' Blue', ' Mean'
  ];
  let person = [
    'Old Person', 'Arsonist', 'Mickey Mouse', 'Mom', 
    'Joe', 'Shronk', 'Jerry', 'Wide Putin', 'Godlike Taco', 
    'Mailman', 'Zombie',  'Cult Leader', 'Cat', 'Santa Claus', 
    'Jeff Bezos', 'Tronald Dump', 'Pterodactyl', 'Gary the Snail',
    'Larynx', 'McDonald\'s Man', 'Gaming Chair', 'Klutzy the Crab',
    'Cheese Man', 'Thought', 'Greck', 'Dad Bot', 'Penguin',
    'Dog Murderer Candy', 'Meme Man', 'TacoBot', 'Demon',
    'MafiaBot', 'Secretary Bot', 'Wide Putin', 'Fence',
    'Easter Bunny', 'Steve', 'Sans', 'Papyrus', 'Bourgeoisie Member',
    'Temmy', 'Elon Musk', 'Donald Duck', 'Obama',
    'Spongebob Squarepants', 'Squidward', 'Krampus',
    'Mr. Krabs', 'Plankton', 'Albert Einstein',
    'Guide', 'Moonlord', 'Phone Guy', 'Mario',
    'Luigi', 'Josephine', 'Jolie', 'Yzabella', 'Crook',
    'Bourgeoisie Member', 'Communist', 'Virus', 'Elmo', 'Cake', 
    'Kim Taehung', 'Jungkook', 'Jimin', 'Taco', 
    'Illuminati Member', 'Protagonist', 'Nemo', 'Toast', 'Virus',
    'Bread'
  ];
  const dreams = [
    'Everything is yellow. mellow yellow. sunflower yellow. plain yellow. paper yellow. daffodil yellow. Holes. breaks. cracks. craters. pockets. pits. Oh wait it\'s just cheese lol.',
    'oʇnd ǝɹɐnb',
    'Great big dollops of snow balls were falling from the sky. you are a great dodger.',
    'What am I, but a collection of materials from the earth? How is it that the same materials dug from the ground can think for itself?',
    'EAT LEAVES. GATHER LEAVES. FARM FUNGI. GIVE FOOD TO THE QUEEN. Q U E E N.',
    'You wake up from your bed. IT\'S 8:00 AM! YOU\'RE LATE! Wait what\'s this? It\'s snowing. You don\'t have to go to school today. It\'s a long weekend.',
    '🎵 We\'re no strangers to love, You know the rules and so do I, A full commitment\'s what I\'m thinking of, You wouldn\'t get this from any other guy 🎵',
    'Red :red_circle: :name_badge: sus :sweat_drops: :sweat_drops:. Red :red_circle: :red_circle: suuuus. I :eye::lips: :eye: said :cowboy::speaking_head: :speech_balloon::blond_haired_person_tone5::sweat_drops: red :japanese_ogre: :red_circle:, sus :sweat_drops: :sweat_drops:, hahahahaha :rofl: :rofl:. Why :thinking: :thinking: arent you :point_right::hushed: :point_left: laughing :joy: :joy:? I :eye::tangerine: :busts_in_silhouette: just made :crown: :crown: a reference :eyes::lips::scream_cat: :eyes::lips::scream_cat: to the popular :thumbsup::grin::joy: :joy: video :video_camera: :video_camera: game :video_game: :video_game: "Among :flag_ro::control_knobs: :moneybag: Us :man: :man:"! How can you :point_left: :point_left: not laugh :joy: :joy: at it? Emergeny meeting :100: :handshake:! Guys :boy: :man:, this here guy :man: :blond_haired_person_tone1::man_tone1: doesnt laugh :rofl: :ballot_box_with_check::joy::sweat_smile: at my funny :smiley::joy: :beer::stuck_out_tongue::smiley: Among :moneybag: :moneybag: Us :man: :man: memes :frog: :joy:! Lets :person_gesturing_ok: :person_gesturing_ok: beat :fist::punch_tone1: :cold_sweat::punch: him :older_man: :man: to death :skull::boom::question: :skull:! Dead :skull::joy: :skull_crossbones: body :dancer: :dancer: reported :telephone: :face_with_monocle:! Skip :penguin: :person_running_tone2:! Skip :penguin: :penguin:! Vote :top: :top: blue :blue_heart: :blue_heart:! Blue :blue_heart: :blue_heart: was not an impostor :sunglasses: :angry:. Among :joy: :person_gesturing_ok_tone3::a: us :man: :man: in a nutshell :angry: :angry: hahahaha :joy::ok_hand::wave: :joy:. What?! Youre still :fingers_crossed::raised_hands: :fingers_crossed::raised_hands: not laughing :joy: :joy: your :point_right: :point_right: ass :peach: :a: off :mobile_phone_off: :mobile_phone_off::skull_crossbones:? I :eye: :eye: made :crown: :crown: SEVERAL :100: :100: funny :grinning::joy::stuck_out_tongue: :smiley::question: references :eyes::lips::scream_cat: :book: to Among :moneybag: :couple_with_heart::couple_mm::couple_ww: Us :man: :flag_us: and YOU :point_left_tone2: :joy::point_right::fire: STILL :fingers_crossed::raised_hands: :rolling_eyes: ARENT LAUGHING :joy: :joy::sunglasses::sweat_drops:??!!! Bruh :warning: :flushed::rofl::joy:. Ya :pray::musical_score: :scream_cat: hear :ear: :ear: that? Wooooooosh :sweat_drops::alien::space_invader: :sweat_drops::alien::space_invader:. Whats :frowning: :frowning: woooosh :helicopter: :helicopter:? Oh :scream_cat: :scream_cat:, nothing :x: :no_entry_sign:. Just the sound :ear: :loud_sound: of a joke :joy: :joy: flying :airplane: :airplane: over :flushed::speak_no_evil::sweat_drops: :repeat: your :point_right: :point_right: head ',
  ]; 
  const personRand = Math.floor(Math.random() * person.length);
  const adjectiveRand = Math.floor(Math.random() * adjective.length);
  const dreamRand = Math.floor(Math.random() * dreams.length);
  const description = [
    `🌩️ You see a flash of **a${adjective[adjectiveRand]} ${person[personRand]}** for a second. What was that? Somehow ${amount} ֎ has made it into your pocket!`,
    `📸 A camera gets shoved directly into your face. You squint behind it, seeing **a${adjective[adjectiveRand]} ${person[personRand]}** handing you ${amount} ֎ with a loud voice.`,
    `🌮 You have been given a taco by **a${adjective[adjectiveRand]} ${person[personRand]}**, which surprisingly sold for ${amount} ֎`,
    `👽 A copious puddle of gloop squeezes up through the cracks of the sidewalk, assuming the identity of **a${adjective[adjectiveRand]} ${person[personRand]}** quite quickly. You were given ${amount} ֎ to shut up.`,
    `🔥 Suddenly, cracks open at your feet. You get pulled into Hell. One of the most nefarious sinners, **a${adjective[adjectiveRand]} ${person[personRand]}** congratulates you for your work with ${amount} ֎.`,
    `👼 One moment you were absentmidely begging, the next minute **a${adjective[adjectiveRand]} ${person[personRand]}** went through your skull. In heaven, some God apologizes profusely, stating "it wasn't your time yet". You were handed ${amount} ֎ by God.`,
    `🧀 External forces cause you to look down at the ground. You spot a scrumptious looking swiss cheese rind sitting peculiarly beside a crack on the sidewalk. You grab it, and slowly chow down. It tastes like molten gold. ${amount} ֎ was added to your account instantaneously.`,
    `🛌 *${dreams[dreamRand]}*. And then, you wake up. **A${adjective[adjectiveRand]} ${person[personRand]}** quietly gives you ${amount} ֎`,
    `🛌 *${dreams[dreamRand]}*- You wake up with a jolt. **A${adjective[adjectiveRand]} ${person[personRand]}** jabs you with ${amount} ֎ and tells you to stay awake.`,
    `📈 Level up! You gained ${amount} ֎! Jk **a${adjective[adjectiveRand]} ${person[personRand]}** gave ֎ to you.`,
    `⚔️ **A${adjective[adjectiveRand]} ${person[personRand]}** was defeated! You gained \`some xp idk\` and ${amount} ֎!`,
    `😎You can't believe it! The one and only **${adjective[adjectiveRand]} ${person[personRand]}**! and **THEY'RE** giving **YOU** ${amount} ֎?!?!? Oh my, I think you might pass out!`,
    `❌? I can't believe it! How did you fail this one? I didn't even think it was possible. I'll take pity on you and give you ${amount} ֎ this time.`,
  ]; 
  const descriptionRand = Math.floor(Math.random() * description.length);
  if (person[personRand] == "Joe")begEmbed.setFooter("Who's Joe?");
  if (adjectiveRand === 8 || adjectiveRand === 40)person[personRand] += 's';
  begEmbed.setDescription(description[descriptionRand]);
  db.add(`users.${message.author.id}.money`, amount);
  if (secret)begEmbed.setDescription('0҉4҉8҉u҉t҉8҉9҉y҉7҉6҉t҉0҉4҉w҉3҉e҉y҉u҉t҉9҉0҉4҉y҉u҉5҉t҉7҉9҉y҉u҉4҉8҉w҉9҉3҉e҉t҉y҉4҉p҉8҉6҉t҉');
  message.lineReply(begEmbed);
}

module.exports.help = {
  name:"beg",
  aliases: [""],
  cooldown: "120",
  help: `Allows you to fall on your knees and beg until a random passerby shows you mercy.`,
  usage: 'beg'
}