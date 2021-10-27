--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-10-27 16:28:46

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
-- TOC entry 205 (class 1259 OID 26268)
-- Name: metrics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.metrics (
    currtemp integer NOT NULL,
    hightemp integer NOT NULL,
    mintemp integer NOT NULL,
    date character varying NOT NULL
);


ALTER TABLE public.metrics OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 26260)
-- Name: mytable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mytable (
    city character varying NOT NULL,
    country character varying NOT NULL,
    creator character varying NOT NULL,
    keywords character varying NOT NULL,
    date character varying NOT NULL,
    "time" character varying NOT NULL,
    dateandtimeformat character varying NOT NULL,
    language character varying NOT NULL,
    timezone character varying NOT NULL
);


ALTER TABLE public.mytable OWNER TO postgres;

--
-- TOC entry 2992 (class 0 OID 26268)
-- Dependencies: 205
-- Data for Name: metrics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.metrics (currtemp, hightemp, mintemp, date) FROM stdin;
25	25	5	2021-10-26
20	24	10	2021-10-25
21	24	2	2021-10-24
24	24	3	2021-10-23
26	27	-1	2021-10-22
25	28	6	2021-10-21
19	24	-3	2021-10-20
20	24	-5	2021-10-19
12	24	0	2021-10-18
24	24	7	2021-10-17
20	24	8	2021-10-16
\.


--
-- TOC entry 2991 (class 0 OID 26260)
-- Dependencies: 204
-- Data for Name: mytable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mytable (city, country, creator, keywords, date, "time", dateandtimeformat, language, timezone) FROM stdin;
Zagreb	Croatia	Marko <marko.vura8@gmail.com>	weather, temperature	2021-10-26	12:00:00:0000	ISO 8601	english	CEST
Zagreb	Croatia	Marko <marko.vura8@gmail.com>	weather, temperature	2021-10-25	12:00:00:0000	ISO 8601	english	CEST
Zagreb	Croatia	Marko <marko.vura8@gmail.com>	weather, temperature	2021-10-24	12:00:00:0000	ISO 8601	english	CEST
Zagreb	Croatia	Marko <marko.vura8@gmail.com>	weather, temperature	2021-10-23	12:00:00:0000	ISO 8601	english	CEST
Zagreb	Croatia	Marko <marko.vura8@gmail.com>	weather, temperature	2021-10-22	12:00:00:0000	ISO 8601	english	CEST
Zagreb	Croatia	Marko <marko.vura8@gmail.com>	weather, temperature	2021-10-21	12:00:00:0000	ISO 8601	english	CEST
Zagreb	Croatia	Marko <marko.vura8@gmail.com>	weather, temperature	2021-10-20	12:00:00:0000	ISO 8601	english	CEST
Zagreb	Croatia	Marko <marko.vura8@gmail.com>	weather, temperature	2021-10-19	12:00:00:0000	ISO 8601	english	CEST
Zagreb	Croatia	Marko <marko.vura8@gmail.com>	weather, temperature	2021-10-18	12:00:00:0000	ISO 8601	english	CEST
Zagreb	Croatia	Marko <marko.vura8@gmail.com>	weather, temperature	2021-10-17	12:00:00:0000	ISO 8601	english	CEST
Zagreb	Croatia	Marko <marko.vura8@gmail.com>	weather, temperature	2021-10-16	12:00:00:0000	ISO 8601	english	CEST
\.


--
-- TOC entry 2859 (class 2606 OID 26267)
-- Name: mytable mytable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mytable
    ADD CONSTRAINT mytable_pkey PRIMARY KEY (date);


--
-- TOC entry 2860 (class 2606 OID 26274)
-- Name: metrics metrics_date_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metrics
    ADD CONSTRAINT metrics_date_fkey FOREIGN KEY (date) REFERENCES public.mytable(date);


-- Completed on 2021-10-27 16:28:46

--
-- PostgreSQL database dump complete
--

