const users = {
  me: { _id: "user1", name: "Jan Novák", email: "jan@novak.cz" },
  wife: { _id: "user2", name: "Marie Nováková", email: "marie@novakova.cz" },
  friend: { _id: "user3", name: "Petr Svoboda", email: "petr@svoboda.cz" },
  colleague: { _id: "user4", name: "Eva Dvořáková", email: "eva@firma.cz" },
  brother: { _id: "user5", name: "Tomáš Novák", email: "tomas@novak.cz" }
};

export const mockCurrentUser = users.me;

export const mockShoppingLists = [
  // 1. Klasický malý nákup
  {
    _id: "list1",
    name: "Rychlý nákup - Večeře",
    ownerId: users.me,
    members: [],
    items: [
      { _id: "item1", name: "Špagety", resolved: false },
      { _id: "item2", name: "Rajčatová omáčka", resolved: false },
      { _id: "item3", name: "Parmezán", resolved: true },
      { _id: "item4", name: "Víno", resolved: false }
    ],
    archived: false,
    createdAt: "2025-01-15T16:30:00.000Z"
  },

  // 2. Velký rodinný nákup
  {
    _id: "list2",
    name: "Týdenní zásoby domů",
    ownerId: users.wife,
    members: [users.me],
    items: [
      { _id: "item20", name: "Mléko 10l", resolved: false },
      { _id: "item21", name: "Vajíčka", resolved: true },
      { _id: "item22", name: "Chleba Šumava", resolved: false },
      { _id: "item23", name: "Máslo", resolved: false },
      { _id: "item24", name: "Šunka pro děti", resolved: true },
      { _id: "item25", name: "Jogurty mix", resolved: false },
      { _id: "item26", name: "Jablka 2kg", resolved: false },
      { _id: "item27", name: "Brambory", resolved: true },
      { _id: "item28", name: "Toaletní papír", resolved: false },
      { _id: "item29", name: "Tablety do myčky", resolved: false }
    ],
    archived: false,
    createdAt: "2025-01-12T09:00:00.000Z"
  },

  // 3. Grilovačka s přáteli
  {
    _id: "list3",
    name: "Letní Grilovačka",
    ownerId: users.me,
    members: [users.friend, users.colleague, users.brother],
    items: [
      { _id: "item30", name: "Krkovice 2kg", resolved: false },
      { _id: "item31", name: "Klobásy pálivé", resolved: false },
      { _id: "item32", name: "Hermelíny na gril", resolved: true },
      { _id: "item33", name: "Pivo (Basa)", resolved: false },
      { _id: "item34", name: "Nealko pivo", resolved: true },
      { _id: "item35", name: "Uhlí / Brikety", resolved: false },
      { _id: "item36", name: "Papírové tácky", resolved: true },
      { _id: "item37", name: "Hořčice a Kečup", resolved: true },
      { _id: "item38", name: "Chleba", resolved: false }
    ],
    archived: false,
    createdAt: "2025-01-10T14:20:00.000Z"
  },

  // 4. Stavebniny
  {
    _id: "list4",
    name: "OBI / Hornbach - Koupelna",
    ownerId: users.me,
    members: [users.wife],
    items: [
      { _id: "item40", name: "Silikon transparentní", resolved: false },
      { _id: "item41", name: "Hmoždinky 8mm", resolved: true },
      { _id: "item42", name: "Vrták do dlažby", resolved: false },
      { _id: "item43", name: "Spárovací hmota bílá", resolved: false }
    ],
    archived: false,
    createdAt: "2025-01-05T10:00:00.000Z"
  },

  // 5. Archivovaný seznam
  {
    _id: "list5",
    name: "Vánoční dárky 2024",
    ownerId: users.me,
    members: [],
    items: [
      { _id: "item50", name: "Parfém pro Marii", resolved: true },
      { _id: "item51", name: "Lego pro malého", resolved: true },
      { _id: "item52", name: "Kniha pro tátu", resolved: true },
      { _id: "item53", name: "Ponožky (klasika)", resolved: true }
    ],
    archived: true,
    createdAt: "2024-12-01T10:00:00.000Z"
  },

  // 6. Kancelářské potřeby
  {
    _id: "list6",
    name: "Nákup do kanceláře",
    ownerId: users.colleague,
    members: [users.me, users.friend],
    items: [
      { _id: "item60", name: "Káva zrnková 1kg", resolved: false },
      { _id: "item61", name: "Mléko do kávy", resolved: true },
      { _id: "item62", name: "Papíry do tiskárny A4", resolved: false },
      { _id: "item63", name: "Zvýrazňovače", resolved: false }
    ],
    archived: false,
    createdAt: "2025-01-14T08:30:00.000Z"
  },

  // 7. Prázdný seznam
  {
    _id: "list7",
    name: "Nápady na výlety",
    ownerId: users.me,
    members: [],
    items: [],
    archived: false,
    createdAt: "2025-01-16T08:00:00.000Z"
  },

  // 8. Drogerie
  {
    _id: "list8",
    name: "DM Drogerie",
    ownerId: users.wife,
    members: [users.me],
    items: [
      { _id: "item80", name: "Šampon", resolved: true },
      { _id: "item81", name: "Sprchový gel", resolved: false }
    ],
    archived: false,
    createdAt: "2025-01-13T18:45:00.000Z"
  }
];