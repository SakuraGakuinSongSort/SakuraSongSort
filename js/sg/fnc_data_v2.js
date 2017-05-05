﻿// 2008/7/3 Scripted by K-Factory@migiwa
// 2009/1/27 Modified by K-Factory@migiwa

// *****************************************************************************
str_CenterT = 'Tie!';
str_CenterB = 'Undo last choice';

str_ImgPath = 'img/';
// 0:順番に　1:昔の
var bln_ResultMode = 1;
// 0:テキスト　1:イラスト　2:テキスト＋イラスト
var int_ResultImg = 2;
// イラスト表示時、何位までをイラスト表示にするか。
var int_ResultRank = 3;

// ソート用のテーブルを
// 0:残す　1:消す
var bln_ResultStyle = 0;

// ソート進捗バーの表示
// 0:表示　1:消す
var bln_ProgessBar = 1;

// Maximum number of result rows before being broken off into another table.
var maxRows = 20;

// * タイトル情報（編集可能。最後の行に”,”を付けないようにしてください）
var int_Colspan = 8;
var ary_TitleData = [
  "Message",
  "Friends",
  "My Generation",
  "Kizuna",
  "Kimi ni Todoke",
  "Kirameki no Kakera",
  "Yakusoku",
  "Others"
];

// * キャラクター情報（編集可能。最後の行に”,”を付けないようにしてください）
// * 使用フラグ（0にするとソートに入りません）, 
//   "タイトルID"（先頭から0, 1, 2...）, 
//   {タイトル別参加フラグ}（1を入れると対象タイトルに入ります）,
//   "キャラクター名", "画像（空白の場合、キャラクター名が使用されます）"
//                                      [1,2,3,4,5,6,7,8,9,
var ary_CharacterData = [
[1, "FLY AWAY", [1,0,0,0,0,0,0,0], "sgsong/message.jpg"],
[1, "Hello! IVY", [1,0,0,0,0,0,0,0], "sgsong/message.jpg"],
[1, "Chime", [1,0,0,0,0,0,0,0], "sgsong/message.jpg"],
[1, "Happy Birthday", [1,0,0,0,0,0,0,0], "sgsong/message.jpg"],
[1, "Princess a la mode", [1,0,0,0,0,0,0,0], "sgsong/message.jpg"],
[1, "Brand New Day", [1,0,0,0,0,0,0,0], "sgsong/message.jpg"],
[1, "Dear Mr.Socrates", [1,0,0,0,0,0,0,0], "sgsong/message.jpg"],
[1, "Medaka no Kyoudai", [1,0,0,0,0,0,0,0], "sgsong/message.jpg"],
[1, "Doki Doki Morning", [1,0,0,0,0,0,0,0], "sgsong/message.jpg"],
[1, "Yume ni Mukatte", [1,0,0,0,0,0,0,0], "sgsong/message.jpg"],
[1, "Message", [1,0,0,0,0,0,0,0], "sgsong/message.jpg"],

[1, "Verishuvi", [0,1,0,0,0,0,0,0], "sgsong/friends.jpg"],
[1, "Friends", [0,1,0,0,0,0,0,0], "sgsong/friends.jpg"],
[1, "Please! Please! Please!", [0,1,0,0,0,0,0,0], "sgsong/friends.jpg"],
[1, "Rapikamu", [0,1,0,0,0,0,0,0], "sgsong/friends.jpg"],
[1, "Hashire Shoujiki Mono", [0,1,0,0,0,0,0,0], "sgsong/friends.jpg"],
[1, "Yokubari Fille", [0,1,0,0,0,0,0,0], "sgsong/friends.jpg"],
[1, "Iine! (Vega Mix)", [0,1,0,0,0,0,0,0], "sgsong/friends.jpg"],
[1, "Otomegokoro", [0,1,0,0,0,0,0,0], "sgsong/friends.jpg"],
[1, "Pictogram", [0,1,0,0,0,0,0,0], "sgsong/friends.jpg"],
[1, "3.a.m", [0,1,0,0,0,0,0,0], "sgsong/friends.jpg"],
[1, "See you", [0,1,0,0,0,0,0,0], "sgsong/friends.jpg"],
[1, "Tabidachi no Hi ni", [0,1,0,0,0,0,0,0], "sgsong/friends.jpg"],

[1, "Wonderful Journey", [0,0,1,0,0,0,0,0], "sgsong/mygen.jpg"],
[1, "Sleep Wonder", [0,0,1,0,0,0,0,0], "sgsong/mygen.jpg"],
[1, "Head Bangya!!", [0,0,1,0,0,0,0,0], "sgsong/mygen.jpg"],
[1, "Miracle Patiful Hamburger", [0,0,1,0,0,0,0,0], "sgsong/mygen.jpg"],
[1, "Suimin Busoku", [0,0,1,0,0,0,0,0], "sgsong/mygen.jpg"],
[1, "Scoreboad ni Love ga Aru", [0,0,1,0,0,0,0,0], "sgsong/mygen.jpg"],
[1, "Science Girl Silence Boy", [0,0,1,0,0,0,0,0], "sgsong/mygen.jpg"],
[1, "Delta", [0,0,1,0,0,0,0,0], "sgsong/mygen.jpg"],
[1, "Sakura iro no Avenue", [0,0,1,0,0,0,0,0], "sgsong/mygen.jpg"],
[1, "My Graduation Toss", [0,0,1,0,0,0,0,0], "sgsong/mygen.jpg"],
[1, "Marshmallow Iro no Kimi to", [0,0,1,0,0,0,0,0], "sgsong/mygen.jpg"],
[1, "Tabidachi no Hi ni (J-MIX 2012)", [0,0,1,0,0,0,0,0], "sgsong/mygen.jpg"],

[1, "Mezase! Super Lady (2013)", [0,0,0,1,0,0,0,0], "sgsong/kizuna.jpg"],
[1, "Makeruna! Seishun Hizakozou", [0,0,0,1,0,0,0,0], "sgsong/kizuna.jpg"],
[1, "Hana Hana", [0,0,0,1,0,0,0,0], "sgsong/kizuna.jpg"],
[1, "Ganbare!!", [0,0,0,1,0,0,0,0], "sgsong/kizuna.jpg"],
[1, "Shanari Hannari Dorayaki Hime", [0,0,0,1,0,0,0,0], "sgsong/kizuna.jpg"],
[1, "Welcome to My Computer", [0,0,0,1,0,0,0,0], "sgsong/kizuna.jpg"],
[1, "Yosou Ijou no Smash", [0,0,0,1,0,0,0,0], "sgsong/kizuna.jpg"],
[1, "FRIENDS ~Unplugged 2013~", [0,0,0,1,0,0,0,0], "sgsong/kizuna.jpg"],
[1, "I·J·I", [0,0,0,1,0,0,0,0], "sgsong/kizuna.jpg"],
[1, "Mikansei Silhouette", [0,0,0,1,0,0,0,0], "sgsong/kizuna.jpg"],
[1, "Jump Up ~Chiisana Yuki~", [0,0,0,1,0,0,0,0], "sgsong/kizuna.jpg"],
[1, "Non-stop Go Home Club Heave Ho!!", [0,0,0,1,0,0,0,0], "sgsong/kizuna.jpg"],

[1, "Mezase! Superlady (2014)", [0,0,0,0,1,0,0,0], "sgsong/kimini.jpg"],
[1, "Animal Rythm", [0,0,0,0,1,0,0,0], "sgsong/kimini.jpg"],
[1, "Heart no Hoshi", [0,0,0,0,1,0,0,0], "sgsong/kimini.jpg"],
[1, "Spin in the Wind", [0,0,0,0,1,0,0,0], "sgsong/kimini.jpg"],
[1, "Tenshi to Akuma (2014)", [0,0,0,0,1,0,0,0], "sgsong/kimini.jpg"],
[1, "Hirari! Kirakira YamiYami Museum", [0,0,0,0,1,0,0,0], "sgsong/kimini.jpg"],
[1, "Piece de Check!", [0,0,0,0,1,0,0,0], "sgsong/kimini.jpg"],
[1, "Takaramono", [0,0,0,0,1,0,0,0], "sgsong/kimini.jpg"],
[1, "Gokigen! Mr.Toropikarorii", [0,0,0,0,1,0,0,0], "sgsong/kimini.jpg"],
[1, "Aogeba Toutoshi", [0,0,0,0,1,0,0,0], "sgsong/kimini.jpg"],
[1, "Sayonara, Namida", [0,0,0,0,1,0,0,0], "sgsong/kimini.jpg"],
[1, "Kimi ni Todoke", [0,0,0,0,1,0,0,0], "sgsong/kimini.jpg"],

[1, "School Days (2015)", [0,0,0,0,0,1,0,0], "sgsong/kirameki.jpg"],
[1, "Mezase! Superlady (2015)", [0,0,0,0,0,1,0,0], "sgsong/kirameki.jpg"],
[1, "Chime (2015)", [0,0,0,0,0,1,0,0], "sgsong/kirameki.jpg"],
[1, "Mathematica!", [0,0,0,0,0,1,0,0], "sgsong/kirameki.jpg"],
[1, "Jakapara Goo Goo Omurice", [0,0,0,0,0,1,0,0], "sgsong/kirameki.jpg"],
[1, "Suimin Busoku (2015)", [0,0,0,0,0,1,0,0], "sgsong/kirameki.jpg"],
[1, "Piece de Check! (2015", [0,0,0,0,0,1,0,0], "sgsong/kirameki.jpg"],
[1, "Science Girl Silence Boy (2015)", [0,0,0,0,0,1,0,0], "sgsong/kirameki.jpg"],
[1, "Michishirube", [0,0,0,0,0,1,0,0], "sgsong/kirameki.jpg"],
[1, "Yakusoku no Mirai", [0,0,0,0,0,1,0,0], "sgsong/kirameki.jpg"],
[1, "Kirameki no Kakera", [0,0,0,0,0,1,0,0], "sgsong/kirameki.jpg"],
[1, "Yume ni Mukatte (2015)", [0,0,0,0,0,1,0,0], "sgsong/kirameki.jpg"],

[1, "Mezase! Superlady (2016)", [0,0,0,0,0,0,1,0], "sgsong/yakusoku.jpg"],
[1, "Makeruna! Seishun Hizakozou (band ver)", [0,0,0,0,0,0,1,0], "sgsong/yakusoku.jpg"],
[1, "Song for Smiling (band ver)", [0,0,0,0,0,0,1,0], "sgsong/yakusoku.jpg"],
[1, "Melodic Solfege", [0,0,0,0,0,0,1,0], "sgsong/yakusoku.jpg"],
[1, "Dabada salad de sebon avenue", [0,0,0,0,0,0,1,0], "sgsong/yakusoku.jpg"],
[1, "Hashire Shoujiki Mono (2016)", [0,0,0,0,0,0,1,0], "sgsong/yakusoku.jpg"],
[1, "Piece de Check! (2016)", [0,0,0,0,0,0,1,0], "sgsong/yakusoku.jpg"],
[1, "Delta (2016)", [0,0,0,0,0,0,1,0], "sgsong/yakusoku.jpg"],
[1, "Yubikiri", [0,0,0,0,0,0,1,0], "sgsong/yakusoku.jpg"],
[1, "Otomegokoro (band ver)", [0,0,0,0,0,0,1,0], "sgsong/yakusoku.jpg"],
[1, "Marshmallow iro no Kimi to (band ver)", [0,0,0,0,0,0,1,0], "sgsong/yakusoku.jpg"],
[1, "Mikansei Silhouette (band ver)", [0,0,0,0,0,0,1,0], "sgsong/yakusoku.jpg"],
[1, "Identity", [0,0,0,0,0,0,1,0], "sgsong/yakusoku.jpg"],
[1, "Yume ni Mukatte (2016)", [0,0,0,0,0,0,1,0], "sgsong/yakusoku.jpg"],

[1, "Ningen tte iina", [0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "School Days", [0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Tenshi to Akuma", [0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Sakura Hyakunin Isshuu", [0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Tabidachi no Hi ni (J-MIX 2011)", [0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Planet Episode 008", [0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Song for Smiling", [0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Magic Melody", [0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Mezase! Super Lady (2012)", [0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Acha! Cha! Kari", [0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Pumpkin Parade", [0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Day Dream Believer", [0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Capsule Scope", [0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Yume wo Hodoku Riron", [0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "IMA ELEMENT", [0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "My Graduation Toss (Su solo)", [0,0,0,0,0,0,0,1], "sgsong/sg.png"],
[1, "Capsule Scope (NHMR ver)", [0,0,0,0,0,0,0,1], "sgsong/sg.png"],
];
