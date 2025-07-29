--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Homebrew)
-- Dumped by pg_dump version 14.18 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _UserContacts; Type: TABLE; Schema: public; Owner: stefanvitanov
--

CREATE TABLE public."_UserContacts" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_UserContacts" OWNER TO stefanvitanov;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: stefanvitanov
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO stefanvitanov;

--
-- Name: messages; Type: TABLE; Schema: public; Owner: stefanvitanov
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "contactId" integer NOT NULL,
    "userId" integer NOT NULL,
    edited boolean DEFAULT false NOT NULL,
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.messages OWNER TO stefanvitanov;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: stefanvitanov
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO stefanvitanov;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stefanvitanov
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: stefanvitanov
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO stefanvitanov;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: stefanvitanov
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO stefanvitanov;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: stefanvitanov
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: stefanvitanov
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: stefanvitanov
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: _UserContacts; Type: TABLE DATA; Schema: public; Owner: stefanvitanov
--

COPY public."_UserContacts" ("A", "B") FROM stdin;
2	1
3	1
3	4
4	3
5	1
5	6
5	7
7	5
6	5
3	7
1	3
7	3
1	2
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: stefanvitanov
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
c54908f2-2fab-49e0-8210-45a1b28215be	aab723f1d5ce8680fba91b0d6db58e35705ee5a6c1f6cdde216659af5f13799d	2025-07-19 09:56:59.548816-04	20250719135659_first_migration	\N	\N	2025-07-19 09:56:59.533165-04	1
32c6194a-d88a-462c-adb4-18320ada63da	3cc1ac1f296344507e43221d1c5190598b0725a121ccdd1f28e405a995e7e544	2025-07-21 12:24:11.371063-04	20250721162411_added_pending_field	\N	\N	2025-07-21 12:24:11.367046-04	1
b8ee70b1-1b2f-4a0d-9ced-cd3a6d0391ef	62c7d0d2895c0483f07e0b403681ae35434cb2a42e92f18a2c00885b68a8b952	2025-07-21 12:24:54.073329-04	20250721162453_default_pending_to_true	\N	\N	2025-07-21 12:24:54.070547-04	1
9f9e6279-b820-4de0-8dc3-8e40a9cb1181	323b91bd55d119c0bbe2299aad2b6c0c0320725c3d823b6252b84159fcfe444e	2025-07-21 13:28:58.517113-04	20250721172858_dropped_pending	\N	\N	2025-07-21 13:28:58.514225-04	1
a1ecaa57-cd04-4fb3-9149-ad2703d0f2c2	606a9e79e431633df15df98e67170dc26752dbb0fd2d926205f3225fd4fb6d45	2025-07-23 19:32:58.59073-04	20250723233258_edited_field	\N	\N	2025-07-23 19:32:58.587455-04	1
40f5b2a2-ec8f-41ea-90b9-409757de645b	39ae0f511fb3c1bf748d4263a371d98075828a23e5442e53672561bb87046322	2025-07-28 14:09:51.45368-04	20250728180951_deleted_field_messages	\N	\N	2025-07-28 14:09:51.449552-04	1
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: stefanvitanov
--

COPY public.messages (id, content, "createdAt", "contactId", "userId", edited, deleted) FROM stdin;
131	Hello	2025-07-29 16:55:35.347	7	5	f	f
2	Hello	2025-07-21 23:25:14.076	2	3	f	f
3	Joe	2025-07-21 23:25:40.647	2	3	f	f
132	hello	2025-07-29 17:00:50.73	7	5	f	f
76	ok	2025-07-26 19:20:46.751	7	7	f	f
77	???	2025-07-26 19:20:55.821	7	7	f	f
20	Hello 	2025-07-22 17:01:32.466	1	3	f	f
21	I swear im not racist	2025-07-22 17:01:38.326	1	3	f	f
23	Whats up Mothafucka	2025-07-22 23:21:23.855	3	1	f	f
29	Hello There	2025-07-23 02:57:11.799	2	1	f	f
4	Nope not doing this	2025-07-21 23:26:38.047	2	3	t	f
39	bout	2025-07-24 03:15:51.324	2	3	f	f
41	be	2025-07-24 03:15:54.96	2	3	f	f
45	I CANT	2025-07-24 17:04:32.454	1	3	f	f
47	Hello	2025-07-24 17:56:56.824	1	3	f	f
48	fef	2025-07-24 17:58:07.901	1	3	f	f
49	bro	2025-07-24 18:02:43.887	1	3	f	f
50	NOOO	2025-07-24 18:03:15.481	1	3	f	f
51	okay	2025-07-24 18:03:22.57	1	3	f	f
52	I CANT	2025-07-24 18:30:31.677	2	3	f	f
5	Yes	2025-07-21 23:27:24.584	2	3	t	f
53	Okay this will do	2025-07-25 03:29:33.267	2	3	f	f
22	Notok	2025-07-22 17:02:48.77	3	1	t	f
56	Hey, this is Tristan	2025-07-25 18:59:18.934	3	4	f	f
57	Hey Tristan, How's it going?	2025-07-25 18:59:52.316	4	3	f	f
60	Hey John Doe, can you see this?	2025-07-25 21:21:33.819	5	6	f	f
61	Yes, I can!	2025-07-25 21:21:56.455	6	5	f	f
62	Cool. Try removing me as a contact to se the pending contact functionality! 	2025-07-25 21:23:03.16	5	6	f	f
64	Or go ahead and make a completely new user using the "Change Account" button in the top left!	2025-07-25 21:26:15.251	5	6	f	f
63	You can also try adding another user, either through email: "glucas@gmail.com" or through their username, "GeorgeLucas". Both work!	2025-07-25 21:25:42.064	5	6	t	f
66	See how I edited that message above? Just hover over a message you sent and you will see the option to either edit, or delete. Look! This one is edited too!	2025-07-25 21:30:59.438	5	6	t	f
67	Switch between John Doe and this account to see how the real time messaging works!	2025-07-25 21:47:41.97	5	7	f	f
69	Hi	2025-07-25 22:40:57.042	1	5	f	f
129	yo	2025-07-28 16:03:44.11	7	3	f	f
75	Joe Brown deleted a message	2025-07-26 19:20:38.017	5	7	t	t
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: stefanvitanov
--

COPY public.users (id, username, email, password, "createdAt") FROM stdin;
1	StefanVitanov	stefankvitanov@gmail.com	$2b$10$EDzU96MOllaxapp8fJ4n3.uKg3Yz0pQWRERa9gBHwqFDCXehokxni	2025-07-19 14:05:42.052
2	GeorgeLucas	glucas@gmail.com	$2b$10$z9C8uTdX2ZmBFDgTKp4dZu5vp1uVPjPyYNT0xfN7j3JFKFlw5B0b2	2025-07-19 14:08:02.305
3	kamen	kamen.vitanov@gmail.com	$2b$10$dtBqv2YYj9cDu5DoY975x.QejYbhpF/pjrd580w1J.dSBluw.b4ou	2025-07-20 16:29:53.71
4	Tristan	JB@gmail.com	$2b$10$QO9twXjDYU.ucsFIrUdg5OWMSHaCRlVF7A.SRf13d1Ffucj5hhZ9K	2025-07-25 18:59:05.756
5	John Doe	demo@test.com	$2b$10$EtBw0fwwgqx4XmF3UdzQwe/X2bYwm2a79ZZ2bSjJVdSui8Kn600uK	2025-07-25 21:18:29.917
6	Jane Doe	demo2@test.com	$2b$10$sa3SbpN9GqYqBOBU.3pH/e5LNonG0vTV056uaKz4DrTV60c1O8ZqK	2025-07-25 21:21:09.781
7	Joe Brown	demo3@test.com	$2b$10$y/deA1t9uFASm.uOX8uWw..nnY.15jupzaQ5pZqfsCpVyvmeRe4RK	2025-07-25 21:46:50.086
\.


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stefanvitanov
--

SELECT pg_catalog.setval('public.messages_id_seq', 132, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: stefanvitanov
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: _UserContacts _UserContacts_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: stefanvitanov
--

ALTER TABLE ONLY public."_UserContacts"
    ADD CONSTRAINT "_UserContacts_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: stefanvitanov
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: stefanvitanov
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: stefanvitanov
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: _UserContacts_B_index; Type: INDEX; Schema: public; Owner: stefanvitanov
--

CREATE INDEX "_UserContacts_B_index" ON public."_UserContacts" USING btree ("B");


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: stefanvitanov
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_username_key; Type: INDEX; Schema: public; Owner: stefanvitanov
--

CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);


--
-- Name: _UserContacts _UserContacts_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: stefanvitanov
--

ALTER TABLE ONLY public."_UserContacts"
    ADD CONSTRAINT "_UserContacts_A_fkey" FOREIGN KEY ("A") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _UserContacts _UserContacts_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: stefanvitanov
--

ALTER TABLE ONLY public."_UserContacts"
    ADD CONSTRAINT "_UserContacts_B_fkey" FOREIGN KEY ("B") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: messages messages_contactId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: stefanvitanov
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "messages_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: messages messages_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: stefanvitanov
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

