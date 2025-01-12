import client from './graphql/client';
import { GetLocaleTextQuery, GetMetadataQuery } from './graphql/schema';

export const LOCALES = ['pseudo'];

export interface Table {
  collection: string;
  fields: string[];
  textFields?: string[];
  foreignKeys?: {
    [field: string]: string | undefined;
  };
}

export const TABLES: { [key: string]: Table } = {
  faction: {
    collection: 'faction',
    fields: [],
    textFields: ['name'], // neutral, space marines, astra militarum, orks, chaos, dark eldar, eldar, tau, tyranids, necrons
  },
  loyalty: {
    collection: 'loyalty',
    fields: [],
    textFields: ['name'], // signature, loyal, common
  },
  type: {
    collection: 'type',
    fields: [],
    textFields: ['name'], // warlord, army, synapse, support, attachment, event
  },
  cycle: {
    collection: 'cycle',
    fields: ['position'],
    textFields: ['name']
  },
  pack: {
    collection: 'pack',
    fields: ['position', 'cycle_id'],
    textFields: ['name'],
    foreignKeys: {
      cycle_id: 'cycle',
    }
  },
  card: {
    collection: 'card',
    fields: [
      'quantity',
      'type_id',
      'pack_id',
      'faction_id',
      'loyalty_id',

      'cost',
      'command_hammers', //int
      'attack', // int
      'health', // int
      'shields', //int
      'unique', // boolean
      'preparation', // boolean
      'horizontal', // boolean
      'illustrator',
      'back_card_id',
      'position',
      'back_attack',
      'back_health',
      'signature_id',
      'tts_sheet_url',
      'tts_sheet_position',
    ],
    textFields: [
      'name',
      'traits',
      'text',
      'flavor',
      'imagesrc',
      'back_imagesrc',
      'back_traits',
      'back_text',
      'back_flavor',
      'keywords',
    ],
    foreignKeys: {
      type_id: 'type',
      faction_id: 'faction',
      pack_id: 'pack',
      loyalty_id: 'loyalty',
    },
  },
};



export const METADATA = [
  {
    file: 'cycles.json',
    ...TABLES.cycle,
    getData: (data: GetMetadataQuery) => data.conquest_cycle,
    getLocale: (data: GetLocaleTextQuery) => data.conquest_cycle_text,
    upsert: client.upsertCardCycle,
    upsertText: client.upsertCardCycleText,
  },
  {
    file: 'packs.json',
    ...TABLES.pack,
    getData: (data: GetMetadataQuery) => data.conquest_pack,
    getLocale: (data: GetLocaleTextQuery) => data.conquest_pack_text,
    upsert: client.upsertCardPack,
    upsertText: client.upsertCardPackText,
  },
  {
    file: 'factions.json',
    ...TABLES.faction,
    getData: (data: GetMetadataQuery) => data.conquest_faction,
    getLocale: (data: GetLocaleTextQuery) => data.conquest_faction_text,
    upsert: client.upsertCardFaction,
    upsertText: client.upsertCardFactionText,
  },
  {
    file: 'loyalties.json',
    ...TABLES.loyalty,
    getData: (data: GetMetadataQuery) => data.conquest_loyalty,
    getLocale: (data: GetLocaleTextQuery) => data.conquest_loyalty_text,
    upsert: client.upsertCardLoyalty,
    upsertText: client.upsertCardLoyaltyText,
  },
  {
    file: 'types.json',
    ...TABLES.type,
    getData: (data: GetMetadataQuery) => data.conquest_type,
    getLocale: (data: GetLocaleTextQuery) => data.conquest_type_text,
    upsert: client.upsertCardType,
    upsertText: client.upsertCardTypeText,
  },
];

export const CARD_DATA = TABLES.card;