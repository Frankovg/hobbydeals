-- ================================================================
-- HobbyDeals — Seed Data (local dev)
-- Requires: migration 00001_initial_schema.sql applied
-- Run with: supabase db reset
-- ================================================================

-- ================================================================
-- SEED DATA — USERS
-- Passwords: Admin1234! (admin) / Test1234! (rest)
-- ================================================================

INSERT INTO auth.users (
    instance_id, id, aud, role, email,
    encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at,
    confirmation_token, email_change, email_change_token_new, recovery_token
)
VALUES
    ('00000000-0000-0000-0000-000000000000','a0000001-0000-0000-0000-000000000000',
     'authenticated','authenticated','admin@hobbydeals.es',
     crypt('Admin1234!', gen_salt('bf')), NOW(),
     '{"provider":"email","providers":["email"]}'::jsonb,
     '{"username":"admin","display_name":"Admin HobbyDeals"}'::jsonb,
     NOW(), NOW(), '', '', '', ''),

    ('00000000-0000-0000-0000-000000000000','a0000002-0000-0000-0000-000000000000',
     'authenticated','authenticated','carlos@example.com',
     crypt('Test1234!', gen_salt('bf')), NOW(),
     '{"provider":"email","providers":["email"]}'::jsonb,
     '{"username":"carlos_gamer","display_name":"Carlos G."}'::jsonb,
     NOW(), NOW(), '', '', '', ''),

    ('00000000-0000-0000-0000-000000000000','a0000003-0000-0000-0000-000000000000',
     'authenticated','authenticated','maria@example.com',
     crypt('Test1234!', gen_salt('bf')), NOW(),
     '{"provider":"email","providers":["email"]}'::jsonb,
     '{"username":"maria_hobbies","display_name":"María L."}'::jsonb,
     NOW(), NOW(), '', '', '', ''),

    ('00000000-0000-0000-0000-000000000000','a0000004-0000-0000-0000-000000000000',
     'authenticated','authenticated','pablo@example.com',
     crypt('Test1234!', gen_salt('bf')), NOW(),
     '{"provider":"email","providers":["email"]}'::jsonb,
     '{"username":"pablo_minis","display_name":"Pablo M."}'::jsonb,
     NOW(), NOW(), '', '', '', ''),

    ('00000000-0000-0000-0000-000000000000','a0000005-0000-0000-0000-000000000000',
     'authenticated','authenticated','lucia@example.com',
     crypt('Test1234!', gen_salt('bf')), NOW(),
     '{"provider":"email","providers":["email"]}'::jsonb,
     '{"username":"lucia_musical","display_name":"Lucía R."}'::jsonb,
     NOW(), NOW(), '', '', '', ''),

    ('00000000-0000-0000-0000-000000000000','a0000006-0000-0000-0000-000000000000',
     'authenticated','authenticated','david@example.com',
     crypt('Test1234!', gen_salt('bf')), NOW(),
     '{"provider":"email","providers":["email"]}'::jsonb,
     '{"username":"david_airsoft","display_name":"David P."}'::jsonb,
     NOW(), NOW(), '', '', '', '');

-- Identities (required by Supabase Auth v2+)
INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
VALUES
    ('a0000001-0000-0000-0000-000000000000','a0000001-0000-0000-0000-000000000000','{"sub":"a0000001-0000-0000-0000-000000000000","email":"admin@hobbydeals.es"}'::jsonb,'email',NOW(),NOW(),NOW()),
    ('a0000002-0000-0000-0000-000000000000','a0000002-0000-0000-0000-000000000000','{"sub":"a0000002-0000-0000-0000-000000000000","email":"carlos@example.com"}'::jsonb,'email',NOW(),NOW(),NOW()),
    ('a0000003-0000-0000-0000-000000000000','a0000003-0000-0000-0000-000000000000','{"sub":"a0000003-0000-0000-0000-000000000000","email":"maria@example.com"}'::jsonb,'email',NOW(),NOW(),NOW()),
    ('a0000004-0000-0000-0000-000000000000','a0000004-0000-0000-0000-000000000000','{"sub":"a0000004-0000-0000-0000-000000000000","email":"pablo@example.com"}'::jsonb,'email',NOW(),NOW(),NOW()),
    ('a0000005-0000-0000-0000-000000000000','a0000005-0000-0000-0000-000000000000','{"sub":"a0000005-0000-0000-0000-000000000000","email":"lucia@example.com"}'::jsonb,'email',NOW(),NOW(),NOW()),
    ('a0000006-0000-0000-0000-000000000000','a0000006-0000-0000-0000-000000000000','{"sub":"a0000006-0000-0000-0000-000000000000","email":"david@example.com"}'::jsonb,'email',NOW(),NOW(),NOW());

-- The handle_new_user trigger auto-creates profiles.
-- Here we update roles and initial reputation:
UPDATE public.profiles SET role = 'admin',     reputation = 1000 WHERE id = 'a0000001-0000-0000-0000-000000000000';
UPDATE public.profiles SET reputation = 245                        WHERE id = 'a0000002-0000-0000-0000-000000000000';
UPDATE public.profiles SET reputation = 180                        WHERE id = 'a0000003-0000-0000-0000-000000000000';
UPDATE public.profiles SET reputation = 320                        WHERE id = 'a0000004-0000-0000-0000-000000000000';
UPDATE public.profiles SET reputation = 95                         WHERE id = 'a0000005-0000-0000-0000-000000000000';
UPDATE public.profiles SET reputation = 150                        WHERE id = 'a0000006-0000-0000-0000-000000000000';

-- ================================================================
-- SEED DATA — CATEGORIES
-- ================================================================
INSERT INTO public.categories (id, name, slug, description, icon, color, sort_order) VALUES
    ('c0000001-0000-0000-0000-000000000000','Juegos de Mesa',        'juegos-de-mesa',      'Chollos en juegos de mesa, TCGs, RPGs y juegos de estrategia',             '🎲','#7F77DD',1),
    ('c0000002-0000-0000-0000-000000000000','Gaming',                'gaming',              'Ofertas en videojuegos, consolas, periféricos y suscripciones',            '🎮','#1D9E75',2),
    ('c0000003-0000-0000-0000-000000000000','Coleccionismo',         'coleccionismo',       'Figuras, Funko, LEGO, cartas y todo tipo de coleccionables',              '🏆','#BA7517',3),
    ('c0000004-0000-0000-0000-000000000000','Airsoft',               'airsoft',             'Réplicas, equipamiento táctico, protecciones y consumibles',              '🎯','#D85A30',4),
    ('c0000005-0000-0000-0000-000000000000','Música',                'musica',              'Instrumentos, equipos de audio, plugins y producción musical',            '🎸','#D4537E',5),
    ('c0000006-0000-0000-0000-000000000000','Modelismo',             'modelismo',           'Miniaturas, pinturas, aerógrafos, kits de modelismo y accesorios',         '🪆','#378ADD',6);

-- ================================================================
-- SEED DATA — STORES
-- ================================================================
INSERT INTO public.stores (id, name, slug, website_url, is_verified) VALUES
    ('50000e01-0000-0000-0000-000000000000','Amazon España',  'amazon-es',     'https://amazon.es',              TRUE),
    ('50000e02-0000-0000-0000-000000000000','FNAC',           'fnac',          'https://fnac.es',                TRUE),
    ('50000e03-0000-0000-0000-000000000000','MediaMarkt',     'mediamarkt',    'https://mediamarkt.es',          TRUE),
    ('50000e04-0000-0000-0000-000000000000','PcComponentes',  'pccomponentes', 'https://pccomponentes.com',      TRUE),
    ('50000e05-0000-0000-0000-000000000000','Thomann',        'thomann',       'https://thomann.de/es',          TRUE),
    ('50000e06-0000-0000-0000-000000000000','El Corte Inglés','el-corte-ingles','https://elcorteingles.es',      TRUE),
    ('50000e07-0000-0000-0000-000000000000','Decathlon',      'decathlon',     'https://decathlon.es',           TRUE),
    ('50000e08-0000-0000-0000-000000000000','Games Workshop', 'games-workshop','https://games-workshop.com',     FALSE),
    ('50000e09-0000-0000-0000-000000000000','Aliexpress',     'aliexpress',    'https://aliexpress.com',         FALSE),
    ('50000e10-0000-0000-0000-000000000000','Steam',          'steam',         'https://store.steampowered.com', TRUE);

-- ================================================================
-- SEED DATA — DEALS (5 per category)
-- ================================================================

-- BOARD GAMES
INSERT INTO public.deals (id,title,description,url,price,original_price,currency,status,category_id,store_id,user_id,temperature,votes_hot,votes_cold,is_featured,created_at)
VALUES
('d0000001-0000-0000-0000-000000000000','Catan Base — precio mínimo histórico',
 'El juego de mesa más famoso del mundo a precio de escándalo. Edición 2023 en castellano con cartas actualizadas.',
 'https://amazon.es/dp/EXAMPLE01',24.99,49.99,'EUR','active','c0000001-0000-0000-0000-000000000000','50000e01-0000-0000-0000-000000000000','a0000002-0000-0000-0000-000000000000',145,78,5,TRUE, NOW()-INTERVAL '2 days'),

('d0000002-0000-0000-0000-000000000000','Ticket to Ride Europa — 35% descuento',
 'Clásico imprescindible en toda ludoteca. Ideal para partidas familiares de 45-90 minutos. Confirmado precio mínimo.',
 'https://fnac.es/EXAMPLE02',35.00,54.99,'EUR','active','c0000001-0000-0000-0000-000000000000','50000e02-0000-0000-0000-000000000000','a0000003-0000-0000-0000-000000000000',89,48,3,FALSE,NOW()-INTERVAL '1 day'),

('d0000003-0000-0000-0000-000000000000','Gloomhaven: Jaws of the Lion — 44% dto.',
 'Versión de entrada al universo Gloomhaven. Dungeon crawler cooperativo para 1-4 jugadores, completamente en castellano.',
 'https://amazon.es/dp/EXAMPLE03',22.50,39.99,'EUR','active','c0000001-0000-0000-0000-000000000000','50000e01-0000-0000-0000-000000000000','a0000004-0000-0000-0000-000000000000',210,112,8,TRUE, NOW()-INTERVAL '3 hours'),

('d0000004-0000-0000-0000-000000000000','Wingspan + Expansión Europa — bundle',
 'Bundle del juego más premiado de los últimos años junto a su expansión europea. 152 cartas de aves adicionales.',
 'https://amazon.es/dp/EXAMPLE04',52.00,85.00,'EUR','active','c0000001-0000-0000-0000-000000000000','50000e01-0000-0000-0000-000000000000','a0000002-0000-0000-0000-000000000000',67,38,4,FALSE,NOW()-INTERVAL '5 hours'),

('d0000005-0000-0000-0000-000000000000','7 Wonders Duel — mejor precio para 2 jugadores',
 'El mejor juego para dos jugadores según BoardGameGeek. Partidas de 30 minutos con profundidad estratégica.',
 'https://elcorteingles.es/EXAMPLE05',22.90,38.99,'EUR','pending','c0000001-0000-0000-0000-000000000000','50000e06-0000-0000-0000-000000000000','a0000005-0000-0000-0000-000000000000',0,0,0,FALSE,NOW()-INTERVAL '30 minutes');

-- GAMING
INSERT INTO public.deals (id,title,description,url,price,original_price,currency,status,category_id,store_id,user_id,temperature,votes_hot,votes_cold,is_featured,created_at)
VALUES
('d0000006-0000-0000-0000-000000000000','God of War Ragnarök PS5 — solo 29.99€',
 'GOTY 2022 a precio increíble. Si tienes PS5 y aún no lo has jugado, este es tu momento. Incluye actualización digital.',
 'https://mediamarkt.es/EXAMPLE06',29.99,79.99,'EUR','active','c0000002-0000-0000-0000-000000000000','50000e03-0000-0000-0000-000000000000','a0000002-0000-0000-0000-000000000000',320,168,10,TRUE, NOW()-INTERVAL '4 hours'),

('d0000007-0000-0000-0000-000000000000','Xbox Game Pass Ultimate 3 meses — 15.99€',
 'Acceso a cientos de juegos + EA Play + xCloud. Precio exclusivo para cuentas sin suscripción activa.',
 'https://store.steampowered.com/EXAMPLE07',15.99,44.99,'EUR','active','c0000002-0000-0000-0000-000000000000','50000e10-0000-0000-0000-000000000000','a0000003-0000-0000-0000-000000000000',189,99,6,FALSE,NOW()-INTERVAL '6 hours'),

('d0000008-0000-0000-0000-000000000000','HyperX Cloud II Gaming Headset — 49.99€',
 'Auriculares gaming con cancelación de ruido y surround 7.1 virtual. Compatibles PC/PS/Xbox. Precio mínimo confirmado.',
 'https://pccomponentes.com/EXAMPLE08',49.99,99.99,'EUR','active','c0000002-0000-0000-0000-000000000000','50000e04-0000-0000-0000-000000000000','a0000006-0000-0000-0000-000000000000',134,71,3,FALSE,NOW()-INTERVAL '1 day'),

('d0000009-0000-0000-0000-000000000000','Elden Ring + Shadow of the Erdtree Bundle',
 'El juego del año 2022 junto a la expansión más esperada al mejor precio hasta la fecha. Versión física.',
 'https://amazon.es/dp/EXAMPLE09',44.99,89.99,'EUR','active','c0000002-0000-0000-0000-000000000000','50000e01-0000-0000-0000-000000000000','a0000004-0000-0000-0000-000000000000',98,53,7,FALSE,NOW()-INTERVAL '2 days'),

('d0000010-0000-0000-0000-000000000000','Monitor gaming 144Hz 27" IPS — 179€',
 'Monitor 1080p con 1ms de respuesta, FreeSync Premium y compatibilidad G-Sync. Ideal para gaming competitivo.',
 'https://pccomponentes.com/EXAMPLE10',179.00,299.00,'EUR','active','c0000002-0000-0000-0000-000000000000','50000e04-0000-0000-0000-000000000000','a0000002-0000-0000-0000-000000000000',76,43,7,FALSE,NOW()-INTERVAL '8 hours');

-- COLLECTIBLES
INSERT INTO public.deals (id,title,description,url,price,original_price,currency,status,category_id,store_id,user_id,temperature,votes_hot,votes_cold,is_featured,created_at)
VALUES
('d0000011-0000-0000-0000-000000000000','LEGO Creator 10295 Porsche 911 — 129€',
 'Set LEGO para adultos con 1458 piezas. Incluye versión Targa y Carrera RS. Precio mínimo histórico confirmado en Bricklink.',
 'https://fnac.es/EXAMPLE11',129.99,179.99,'EUR','active','c0000003-0000-0000-0000-000000000000','50000e02-0000-0000-0000-000000000000','a0000003-0000-0000-0000-000000000000',178,93,5,TRUE, NOW()-INTERVAL '1 day'),

('d0000012-0000-0000-0000-000000000000','Magic TG: Draft Booster Box Bloomburrow — 79.99€',
 'Caja de 36 sobres del último set de MTG. Ideal para draft o para abrir y coleccionar. Sin comisiones de revendedor.',
 'https://amazon.es/dp/EXAMPLE12',79.99,129.99,'EUR','active','c0000003-0000-0000-0000-000000000000','50000e01-0000-0000-0000-000000000000','a0000005-0000-0000-0000-000000000000',134,72,4,FALSE,NOW()-INTERVAL '3 days'),

('d0000013-0000-0000-0000-000000000000','Funko Pop Star Wars: Mandalorian + Grogu pack',
 'Pack exclusivo de dos Funko Pops del Mandaloriano con Grogu. Edición especial con caja coleccionista.',
 'https://amazon.es/dp/EXAMPLE13',19.99,34.99,'EUR','active','c0000003-0000-0000-0000-000000000000','50000e01-0000-0000-0000-000000000000','a0000006-0000-0000-0000-000000000000',87,48,4,FALSE,NOW()-INTERVAL '6 hours'),

('d0000014-0000-0000-0000-000000000000','Pokemon TCG: Booster Bundle 6 sobres — 18€',
 'Bundle oficial de 6 sobres de Pokémon Scarlet & Violet. Distribución oficial, sin intermediarios.',
 'https://elcorteingles.es/EXAMPLE14',18.00,29.99,'EUR','active','c0000003-0000-0000-0000-000000000000','50000e06-0000-0000-0000-000000000000','a0000002-0000-0000-0000-000000000000',112,61,5,FALSE,NOW()-INTERVAL '2 days'),

('d0000015-0000-0000-0000-000000000000','Hot Wheels Premium Car Culture 5-pack',
 'Set premium de 5 coches a escala 1:64 con ruedas de goma real. Muy cotizado por coleccionistas, difícil de encontrar.',
 'https://amazon.es/dp/EXAMPLE15',24.99,39.99,'EUR','pending','c0000003-0000-0000-0000-000000000000','50000e01-0000-0000-0000-000000000000','a0000004-0000-0000-0000-000000000000',0,0,0,FALSE,NOW()-INTERVAL '45 minutes');

-- AIRSOFT & PAINTBALL
INSERT INTO public.deals (id,title,description,url,price,original_price,currency,status,category_id,store_id,user_id,temperature,votes_hot,votes_cold,is_featured,created_at)
VALUES
('d0000016-0000-0000-0000-000000000000','Pistola Airsoft Tokyo Marui Glock 17 GBB',
 'Réplica Gas Blow Back de la Glock 17 de Tokyo Marui. La mejor pistola GBB del mercado, calidad japonesa.',
 'https://airsoftzone.es/EXAMPLE16',89.99,149.99,'EUR','active','c0000004-0000-0000-0000-000000000000',NULL,'a0000006-0000-0000-0000-000000000000',156,83,6,TRUE, NOW()-INTERVAL '12 hours'),

('d0000017-0000-0000-0000-000000000000','Máscara Paintball JT Spectra Flex 8 — 35€',
 'Máscara con lente térmica antiempañante y sistema de ventilación. Homologada para campos en España.',
 'https://amazon.es/dp/EXAMPLE17',34.99,69.99,'EUR','active','c0000004-0000-0000-0000-000000000000','50000e01-0000-0000-0000-000000000000','a0000003-0000-0000-0000-000000000000',78,43,5,FALSE,NOW()-INTERVAL '1 day'),

('d0000018-0000-0000-0000-000000000000','BBs BLS Premium 0.25g — 5000 unidades 12.99€',
 'BBs biodegradables de alta precisión certificadas. Compatibles con cañones de 6.01 a 6.08mm. Zero jamming.',
 'https://amazon.es/dp/EXAMPLE18',12.99,19.99,'EUR','active','c0000004-0000-0000-0000-000000000000','50000e01-0000-0000-0000-000000000000','a0000006-0000-0000-0000-000000000000',234,124,2,FALSE,NOW()-INTERVAL '2 hours'),

('d0000019-0000-0000-0000-000000000000','Chaleco Táctico Emerson CPC Multicam — 55€',
 'Chaleco portaplaca con sistema MOLLE compatible y múltiples compartimentos. Talla ajustable.',
 'https://aliexpress.com/EXAMPLE19',54.99,99.99,'EUR','active','c0000004-0000-0000-0000-000000000000','50000e09-0000-0000-0000-000000000000','a0000004-0000-0000-0000-000000000000',43,28,9,FALSE,NOW()-INTERVAL '3 days'),

('d0000020-0000-0000-0000-000000000000','Batería LiPo 11.1v 2200mAh Airsoft — 15.99€',
 'Batería LiPo de alto rendimiento con conector Mini Tamiya. Compatible con M4, MP5 y la mayoría de AEGs.',
 'https://amazon.es/dp/EXAMPLE20',15.99,29.99,'EUR','active','c0000004-0000-0000-0000-000000000000','50000e01-0000-0000-0000-000000000000','a0000002-0000-0000-0000-000000000000',98,53,3,FALSE,NOW()-INTERVAL '5 hours');

-- MUSIC
INSERT INTO public.deals (id,title,description,url,price,original_price,currency,status,category_id,store_id,user_id,temperature,votes_hot,votes_cold,is_featured,created_at)
VALUES
('d0000021-0000-0000-0000-000000000000','Guitarra Eléctrica Squier Classic Vibe 60s — 299€',
 'La mejor relación calidad-precio del mercado según cualquier foro de guitarras. Pickups vintage Alnico de serie.',
 'https://thomann.de/es/EXAMPLE21',299.00,449.00,'EUR','active','c0000005-0000-0000-0000-000000000000','50000e05-0000-0000-0000-000000000000','a0000005-0000-0000-0000-000000000000',187,98,7,TRUE, NOW()-INTERVAL '1 day'),

('d0000022-0000-0000-0000-000000000000','Interface Audio Focusrite Scarlett Solo 4ª gen — 79€',
 'La interfaz de audio más vendida del mundo. Conversores 24-bit/192kHz y preamp Air para sonido más brillante.',
 'https://amazon.es/dp/EXAMPLE22',79.00,129.00,'EUR','active','c0000005-0000-0000-0000-000000000000','50000e01-0000-0000-0000-000000000000','a0000003-0000-0000-0000-000000000000',143,76,4,FALSE,NOW()-INTERVAL '6 hours'),

('d0000023-0000-0000-0000-000000000000','Auriculares Audio-Technica ATH-M50x — 99€',
 'Referencia del sector para mezcla y producción. Respuesta plana de 15Hz-28kHz. Incluye 3 cables intercambiables.',
 'https://amazon.es/dp/EXAMPLE23',99.00,169.00,'EUR','active','c0000005-0000-0000-0000-000000000000','50000e01-0000-0000-0000-000000000000','a0000006-0000-0000-0000-000000000000',112,61,5,FALSE,NOW()-INTERVAL '2 days'),

('d0000024-0000-0000-0000-000000000000','Plugin Waves Gold Bundle — 29.99€',
 '40+ plugins profesionales de audio (SSL, L2, CLA-76...) sin iLok. Licencia en hasta 3 ordenadores con app Waves.',
 'https://waves.com/EXAMPLE24',29.99,599.00,'EUR','active','c0000005-0000-0000-0000-000000000000',NULL,'a0000005-0000-0000-0000-000000000000',267,142,11,TRUE, NOW()-INTERVAL '4 hours'),

('d0000025-0000-0000-0000-000000000000','Batería Electrónica Roland TD-1DMK — 399€',
 'Kit de batería electrónica con 4 PDX pads de malla para mayor naturalidad. Módulo TD-1DMK con 15 kits de serie.',
 'https://mediamarkt.es/EXAMPLE25',399.00,649.00,'EUR','active','c0000005-0000-0000-0000-000000000000','50000e03-0000-0000-0000-000000000000','a0000002-0000-0000-0000-000000000000',65,38,8,FALSE,NOW()-INTERVAL '3 days');

-- MODELING & MINIATURES
INSERT INTO public.deals (id,title,description,url,price,original_price,currency,status,category_id,store_id,user_id,temperature,votes_hot,votes_cold,is_featured,created_at)
VALUES
('d0000026-0000-0000-0000-000000000000','Set Pinturas Citadel Base 21 colores + guía',
 'Set completo de pinturas base Citadel con guía de colores Warhammer incluida. La forma más económica de empezar.',
 'https://gamesworkshop.com/EXAMPLE26',39.99,63.00,'EUR','active','c0000006-0000-0000-0000-000000000000','50000e08-0000-0000-0000-000000000000','a0000004-0000-0000-0000-000000000000',198,104,6,TRUE, NOW()-INTERVAL '8 hours'),

('d0000027-0000-0000-0000-000000000000','Warhammer 40K Combat Patrol: Space Marines — 75€',
 'Caja de inicio con 24 miniaturas listas para jugar. La forma más económica de empezar con los Ultramarines.',
 'https://gamesworkshop.com/EXAMPLE27',75.00,110.00,'EUR','active','c0000006-0000-0000-0000-000000000000','50000e08-0000-0000-0000-000000000000','a0000003-0000-0000-0000-000000000000',167,89,5,FALSE,NOW()-INTERVAL '2 days'),

('d0000028-0000-0000-0000-000000000000','Compresor Aerógrafo Iwata Power Jet Pro — 189€',
 'Compresor silencioso de doble pistón con depósito de 1L. El preferido por pintores de miniaturas profesionales.',
 'https://amazon.es/dp/EXAMPLE28',189.00,299.00,'EUR','active','c0000006-0000-0000-0000-000000000000','50000e01-0000-0000-0000-000000000000','a0000004-0000-0000-0000-000000000000',123,66,3,FALSE,NOW()-INTERVAL '1 day'),

('d0000029-0000-0000-0000-000000000000','Elegoo Saturn 3 Ultra: Impresora 3D Resina — 299€',
 'Impresora de resina 12K con pantalla 10" MSLA. Resolución perfecta para imprimir miniaturas en alta fidelidad.',
 'https://amazon.es/dp/EXAMPLE29',299.00,449.00,'EUR','active','c0000006-0000-0000-0000-000000000000','50000e01-0000-0000-0000-000000000000','a0000006-0000-0000-0000-000000000000',89,49,6,FALSE,NOW()-INTERVAL '3 days'),

('d0000030-0000-0000-0000-000000000000','Star Wars Legion: Caja Base — 59.99€',
 'Juego de miniaturas Star Wars con Rebeldes e Imperiales. 33 miniaturas, terreno y dados. Completamente en castellano.',
 'https://amazon.es/dp/EXAMPLE30',59.99,89.99,'EUR','active','c0000006-0000-0000-0000-000000000000','50000e01-0000-0000-0000-000000000000','a0000002-0000-0000-0000-000000000000',145,78,5,TRUE, NOW()-INTERVAL '4 hours');

-- ================================================================
-- SEED DATA — VOTES
-- ================================================================
INSERT INTO public.deal_votes (deal_id, user_id, vote) VALUES
    ('d0000001-0000-0000-0000-000000000000','a0000003-0000-0000-0000-000000000000','hot'),
    ('d0000001-0000-0000-0000-000000000000','a0000004-0000-0000-0000-000000000000','hot'),
    ('d0000001-0000-0000-0000-000000000000','a0000005-0000-0000-0000-000000000000','hot'),
    ('d0000001-0000-0000-0000-000000000000','a0000006-0000-0000-0000-000000000000','hot'),

    ('d0000003-0000-0000-0000-000000000000','a0000002-0000-0000-0000-000000000000','hot'),
    ('d0000003-0000-0000-0000-000000000000','a0000003-0000-0000-0000-000000000000','hot'),
    ('d0000003-0000-0000-0000-000000000000','a0000005-0000-0000-0000-000000000000','hot'),

    ('d0000006-0000-0000-0000-000000000000','a0000003-0000-0000-0000-000000000000','hot'),
    ('d0000006-0000-0000-0000-000000000000','a0000004-0000-0000-0000-000000000000','hot'),
    ('d0000006-0000-0000-0000-000000000000','a0000005-0000-0000-0000-000000000000','hot'),
    ('d0000006-0000-0000-0000-000000000000','a0000006-0000-0000-0000-000000000000','hot'),

    ('d0000018-0000-0000-0000-000000000000','a0000002-0000-0000-0000-000000000000','hot'),
    ('d0000018-0000-0000-0000-000000000000','a0000004-0000-0000-0000-000000000000','hot'),
    ('d0000018-0000-0000-0000-000000000000','a0000005-0000-0000-0000-000000000000','hot'),

    ('d0000024-0000-0000-0000-000000000000','a0000002-0000-0000-0000-000000000000','hot'),
    ('d0000024-0000-0000-0000-000000000000','a0000003-0000-0000-0000-000000000000','hot'),
    ('d0000024-0000-0000-0000-000000000000','a0000004-0000-0000-0000-000000000000','hot'),
    ('d0000024-0000-0000-0000-000000000000','a0000006-0000-0000-0000-000000000000','hot'),

    ('d0000026-0000-0000-0000-000000000000','a0000002-0000-0000-0000-000000000000','hot'),
    ('d0000026-0000-0000-0000-000000000000','a0000003-0000-0000-0000-000000000000','hot'),
    ('d0000026-0000-0000-0000-000000000000','a0000005-0000-0000-0000-000000000000','hot'),
    ('d0000026-0000-0000-0000-000000000000','a0000006-0000-0000-0000-000000000000','hot');

-- ================================================================
-- SEED DATA — COMMENTS
-- ================================================================
INSERT INTO public.comments (deal_id, user_id, content, created_at) VALUES
    ('d0000001-0000-0000-0000-000000000000','a0000003-0000-0000-0000-000000000000','Precio mínimo histórico confirmado en Keepa. Lo he pedido ya, envío en 2 días.',NOW()-INTERVAL '1 day 23 hours'),
    ('d0000001-0000-0000-0000-000000000000','a0000004-0000-0000-0000-000000000000','Perfecto para regalar. Es la edición 2023 con las cartas actualizadas, confirmado.',NOW()-INTERVAL '1 day 22 hours'),
    ('d0000001-0000-0000-0000-000000000000','a0000005-0000-0000-0000-000000000000','¿Alguien sabe si incluye la expansión Marineros o es solo la base?',NOW()-INTERVAL '1 day 20 hours'),
    ('d0000001-0000-0000-0000-000000000000','a0000003-0000-0000-0000-000000000000','@lucia_musical es solo la base, la expansión va por separado.',NOW()-INTERVAL '1 day 19 hours'),

    ('d0000003-0000-0000-0000-000000000000','a0000002-0000-0000-0000-000000000000','Juegazo para iniciarse en los dungeon crawlers, lo recomiendo 100%. Tutorial integrado en el juego.',NOW()-INTERVAL '2 hours'),
    ('d0000003-0000-0000-0000-000000000000','a0000005-0000-0000-0000-000000000000','¿Viene completamente en castellano? Gracias',NOW()-INTERVAL '1 hour'),
    ('d0000003-0000-0000-0000-000000000000','a0000004-0000-0000-0000-000000000000','Sí, viene completamente en castellano @lucia_musical. Calidad de traducción muy buena.',NOW()-INTERVAL '45 minutes'),

    ('d0000006-0000-0000-0000-000000000000','a0000003-0000-0000-0000-000000000000','CHOLLAZO. Lo compré en lanzamiento a 80€ y merece cada euro. A este precio es un robo.',NOW()-INTERVAL '3 hours'),
    ('d0000006-0000-0000-0000-000000000000','a0000005-0000-0000-0000-000000000000','¿La versión de PS4 también está de oferta o solo la de PS5?',NOW()-INTERVAL '2 hours'),
    ('d0000006-0000-0000-0000-000000000000','a0000002-0000-0000-0000-000000000000','Solo la de PS5. La de PS4 sigue al precio normal por lo que vi.',NOW()-INTERVAL '1 hour 30 minutes'),

    ('d0000018-0000-0000-0000-000000000000','a0000006-0000-0000-0000-000000000000','Las uso desde hace 2 años. Las mejores BBs económicas del mercado. Zero jamming en mis AEGs.',NOW()-INTERVAL '1 hour'),

    ('d0000024-0000-0000-0000-000000000000','a0000005-0000-0000-0000-000000000000','El Gold Bundle es oro puro (nunca mejor dicho). SSL, L2, CLA-76... todos los clásicos de estudio.',NOW()-INTERVAL '3 hours'),
    ('d0000024-0000-0000-0000-000000000000','a0000003-0000-0000-0000-000000000000','¿Son con iLok o con cuenta Waves? Quiero saber antes de comprar',NOW()-INTERVAL '2 hours'),
    ('d0000024-0000-0000-0000-000000000000','a0000005-0000-0000-0000-000000000000','Solo cuenta Waves, sin iLok. La app de Waves sirve de licencia en hasta 3 ordenadores @maria_hobbies',NOW()-INTERVAL '1 hour 45 minutes'),

    ('d0000026-0000-0000-0000-000000000000','a0000004-0000-0000-0000-000000000000','Estas pinturas duran años si las conservas bien. Recomiendo poner un poco de agua destilada si se secan.',NOW()-INTERVAL '7 hours'),
    ('d0000026-0000-0000-0000-000000000000','a0000003-0000-0000-0000-000000000000','¿Hay algún tutorial para empezar? Soy totalmente nuevo en el modelismo.',NOW()-INTERVAL '6 hours'),
    ('d0000026-0000-0000-0000-000000000000','a0000004-0000-0000-0000-000000000000','El canal de YouTube de Warhammer tiene tutoriales oficiales gratuitos muy buenos @maria_hobbies. Empieza por "How to Paint" básico.',NOW()-INTERVAL '5 hours');

-- ================================================================
-- SEED DATA — ALERTS
-- ================================================================
INSERT INTO public.alerts (user_id, keyword, category_id, max_price, is_active) VALUES
    ('a0000002-0000-0000-0000-000000000000','Switch OLED',  'c0000002-0000-0000-0000-000000000000',299.00,TRUE),
    ('a0000002-0000-0000-0000-000000000000','PS5',          'c0000002-0000-0000-0000-000000000000',500.00,TRUE),
    ('a0000003-0000-0000-0000-000000000000','Wingspan',     'c0000001-0000-0000-0000-000000000000', 40.00,TRUE),
    ('a0000003-0000-0000-0000-000000000000','Focusrite',    'c0000005-0000-0000-0000-000000000000',100.00,TRUE),
    ('a0000004-0000-0000-0000-000000000000','aerógrafo',    'c0000006-0000-0000-0000-000000000000',200.00,TRUE),
    ('a0000004-0000-0000-0000-000000000000','Gloomhaven',   'c0000001-0000-0000-0000-000000000000', 60.00,TRUE),
    ('a0000005-0000-0000-0000-000000000000','guitarra',     'c0000005-0000-0000-0000-000000000000',400.00,TRUE),
    ('a0000006-0000-0000-0000-000000000000','Tokyo Marui',  'c0000004-0000-0000-0000-000000000000',150.00,TRUE);

-- ================================================================
-- SEED DATA — FOLLOWED CATEGORIES
-- ================================================================
INSERT INTO public.user_category_follows (user_id, category_id) VALUES
    ('a0000002-0000-0000-0000-000000000000','c0000001-0000-0000-0000-000000000000'),
    ('a0000002-0000-0000-0000-000000000000','c0000002-0000-0000-0000-000000000000'),
    ('a0000003-0000-0000-0000-000000000000','c0000001-0000-0000-0000-000000000000'),
    ('a0000003-0000-0000-0000-000000000000','c0000005-0000-0000-0000-000000000000'),
    ('a0000004-0000-0000-0000-000000000000','c0000006-0000-0000-0000-000000000000'),
    ('a0000004-0000-0000-0000-000000000000','c0000001-0000-0000-0000-000000000000'),
    ('a0000005-0000-0000-0000-000000000000','c0000005-0000-0000-0000-000000000000'),
    ('a0000006-0000-0000-0000-000000000000','c0000004-0000-0000-0000-000000000000'),
    ('a0000006-0000-0000-0000-000000000000','c0000002-0000-0000-0000-000000000000');

-- ================================================================
-- SEED DATA — SAVED DEALS
-- ================================================================
INSERT INTO public.saved_deals (user_id, deal_id) VALUES
    ('a0000002-0000-0000-0000-000000000000','d0000006-0000-0000-0000-000000000000'),
    ('a0000002-0000-0000-0000-000000000000','d0000001-0000-0000-0000-000000000000'),
    ('a0000003-0000-0000-0000-000000000000','d0000022-0000-0000-0000-000000000000'),
    ('a0000003-0000-0000-0000-000000000000','d0000011-0000-0000-0000-000000000000'),
    ('a0000004-0000-0000-0000-000000000000','d0000026-0000-0000-0000-000000000000'),
    ('a0000004-0000-0000-0000-000000000000','d0000028-0000-0000-0000-000000000000'),
    ('a0000005-0000-0000-0000-000000000000','d0000024-0000-0000-0000-000000000000'),
    ('a0000006-0000-0000-0000-000000000000','d0000016-0000-0000-0000-000000000000'),
    ('a0000006-0000-0000-0000-000000000000','d0000018-0000-0000-0000-000000000000');

-- ================================================================
-- SEED DATA — TAGS
-- ================================================================
INSERT INTO public.tags (name, slug, category_id) VALUES
    ('precio mínimo',      'precio-minimo',      NULL),
    ('oferta flash',       'oferta-flash',       NULL),
    ('bundle',             'bundle',             NULL),
    ('para regalar',       'para-regalar',       NULL),
    ('principiantes',      'principiantes',      NULL),
    ('amazon prime',       'amazon-prime',       NULL),
    ('segunda mano',       'segunda-mano',       NULL),
    ('warhammer',          'warhammer',          'c0000006-0000-0000-0000-000000000000'),
    ('magic the gathering','magic-the-gathering','c0000003-0000-0000-0000-000000000000'),
    ('pokemon',            'pokemon',            'c0000003-0000-0000-0000-000000000000'),
    ('lego',               'lego',               'c0000003-0000-0000-0000-000000000000'),
    ('ps5',                'ps5',                'c0000002-0000-0000-0000-000000000000'),
    ('pc gaming',          'pc-gaming',          'c0000002-0000-0000-0000-000000000000'),
    ('nintendo',           'nintendo',           'c0000002-0000-0000-0000-000000000000'),
    ('airsoft aeg',        'airsoft-aeg',        'c0000004-0000-0000-0000-000000000000'),
    ('airsoft gbb',        'airsoft-gbb',        'c0000004-0000-0000-0000-000000000000'),
    ('dungeon crawler',    'dungeon-crawler',     'c0000001-0000-0000-0000-000000000000'),
    ('euro game',          'euro-game',          'c0000001-0000-0000-0000-000000000000');

-- ================================================================
-- Update denormalized counters
-- ================================================================
UPDATE public.categories SET deals_count = (
    SELECT COUNT(*) FROM public.deals
    WHERE category_id = categories.id AND status = 'active'
);
UPDATE public.stores SET deals_count = (
    SELECT COUNT(*) FROM public.deals WHERE store_id = stores.id
);
UPDATE public.profiles SET deals_count = (
    SELECT COUNT(*) FROM public.deals WHERE user_id = profiles.id
);
