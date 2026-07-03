# Roadmap: Junior → Middle → Middle+ Fullstack Developer

> **Стек:** C# · ASP.NET Core · PostgreSQL · EF Core · React · TypeScript · Azure · Kubernetes  
> **Подход:** с нуля, с глубоким пониманием каждого узла  
> **Масштаб:** 20 фаз · ~157 узлов · ~1815 подтем  
> **Формат:** ключевые узлы → подтемы в папках `lessons/{id}/` (см. [AGENTS.md](./AGENTS.md))  
> **Треки:** Фазы 0–9 = **Middle** · Фазы 10–19 = **Middle+**

<!-- LESSON-STATUS:START -->
> **Уроки в `lessons/`:** 📚 70 полных · 📝 0 частичных · — 1763 без материалов · *обновляется: `npm run parse-roadmap`*
<!-- LESSON-STATUS:END -->

---

## Обзор пути

```
┌──────────────────────────────────────────────────────────────────────────┐
│  MIDDLE TRACK (Фазы 0–9)                                                 │
│  0 Foundations → 1 Backend → 2 Frontend → 3 Integration                  │
│  4 Architecture → 5 Production → 6 Craft → 7–8 Scale intro → 9 Capstone 1│
├──────────────────────────────────────────────────────────────────────────┤
│  MIDDLE+ TRACK (Фазы 10–19) — после Capstone 1 или параллельно фазам 7–8 │
│  10 Cloud & IaC    11 Kubernetes     12 System Design (deep)               │
│  13 Distributed    14 Observability  15 Security prod                    │
│  16 Arch+Frontend  17 Algorithms*    18 Leadership                       │
│  19 Capstone 2 + Career    *опционально для algo-heavy компаний          │
└──────────────────────────────────────────────────────────────────────────┘
```

| Трек | Длительность | Результат |
|---|---------|---------|------|
| **Middle** (фазы 0–9) | 14–20 мес | Уверенный Middle fullstack |
| **Middle+** (фазы 10–19) | +8–12 мес | Middle+ ready + portfolio |
| **Полный путь** | 22–32 мес | Junior → Middle+ |

**Рекомендуемая нагрузка:** 15–20 часов в неделю.

### ⭐ Ключевые модули (расширены — больше подтем)

Эти узлы — **ядро Middle fullstack**. На них уходит больше всего времени и глубины:

| Узел | Тема | Подтем |
|------|------|--------|
| **1.3** | C# LINQ, generics, delegates | ~30 |
| **1.4** | C# async/await | ~42 |
| **1.7** | SQL: индексы, транзакции, планы | ~36 |
| **1.10** | ASP.NET Core: основы, DI, pipeline | ~45 |
| **1.11** | ASP.NET Core: API design | ~40 |
| **1.12** | EF Core: основы | ~48 |
| **1.13** | EF Core: продвинутое | ~35 |
| **1.18** | Algorithms in .NET/EF | ~25 |
| **2.2** | JavaScript: closures, event loop, async | ~42 |
| **2.5** | React: hooks (глубоко) | ~38 |
| **2.7** | Server/client state (React Query) | ~30 |
| **3.1** | Authentication & Authorization | ~45 |
| **4.3** | Clean Architecture | ~33 |

---

## Фаза 0: Foundations (Фундамент)

> Без этого фундамента всё остальное будет «магией». Не пропускать.

### Узел 0.1 — Git: основы
**ID:** `00-git` | **Статус:** 🔲
> **Материалы:** 📚 12/12

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 0.1.1 | VCS: local vs centralized vs distributed — зачем Git | понимание | 📚 |
| 0.1.2 | Repository, working tree, staging area, commit | понимание | 📚 |
| 0.1.3 | git init, clone, status, add, commit, log, diff | практика | 📚 |
| 0.1.4 | .git/ structure: objects, refs, HEAD (concept) | **глубоко** | 📚 |
| 0.1.5 | SHA-1 hashes, commit graph, parent pointers | понимание | 📚 |
| 0.1.6 | .gitignore patterns, .gitkeep | практика | 📚 |
| 0.1.7 | git show, git blame — forensics | практика | 📚 |
| 0.1.8 | Undo: restore, revert vs reset (soft/mixed/hard) | **глубоко** | 📚 |
| 0.1.9 | git stash, stash pop, stash list | практика | 📚 |
| 0.1.10 | Amending commits — когда можно, когда нельзя | понимание | 📚 |
| 0.1.11 | Detached HEAD state — что это и как выйти | **глубоко** | 📚 |
| 0.1.12 | git clean — удаление untracked files | практика | 📚 |

### Узел 0.2 — Git: ветки и collaboration
**ID:** `00-git-advanced` | **Статус:** 🔲
> **Материалы:** 📚 15/15

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 0.2.1 | branch, checkout, switch — указатели на commits | **глубоко** | 📚 |
| 0.2.2 | merge: fast-forward vs merge commit vs squash | **глубоко** | 📚 |
| 0.2.3 | rebase: linear history, interactive rebase | **глубоко** | 📚 |
| 0.2.4 | merge vs rebase — trade-offs, golden rules | **глубоко** | 📚 |
| 0.2.5 | Conflict resolution: markers, strategies, tools | практика | 📚 |
| 0.2.6 | remote: origin, fetch, pull, push | практика | 📚 |
| 0.2.7 | upstream tracking, push -u, pull --rebase | практика | 📚 |
| 0.2.8 | Pull Request / Merge Request workflow | практика | 📚 |
| 0.2.9 | Conventional Commits: feat, fix, chore, BREAKING | практика | 📚 |
| 0.2.10 | Code review etiquette — giving & receiving feedback | понимание | 📚 |
| 0.2.11 | git cherry-pick, git revert для hotfix | практика | 📚 |
| 0.2.12 | git bisect — find breaking commit | понимание | 📚 |
| 0.2.13 | Tags: lightweight vs annotated, semver releases | практика | 📚 |
| 0.2.14 | .gitattributes — line endings (LF/CRLF) | понимание | 📚 |
| 0.2.15 | Monorepo vs polyrepo (concept) | понимание | 📚 |

### Узел 0.3 — HTTP и Web
**ID:** `00-http` | **Статус:** 🔲
> **Материалы:** 📚 15/15

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 0.3.1 | Client-Server, request-response model | понимание | 📚 |
| 0.3.2 | URL anatomy: scheme, host, port, path, query, fragment | понимание | 📚 |
| 0.3.3 | HTTP message structure: start line, headers, body | **глубоко** | 📚 |
| 0.3.4 | Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS | **глубоко** | 📚 |
| 0.3.5 | Safe vs idempotent methods — matrix | **глубоко** | 📚 |
| 0.3.6 | Status codes: 200, 201, 204, 301, 304, 400, 401, 403, 404, 409, 422, 429, 500, 502, 503 | **глубоко** | 📚 |
| 0.3.7 | Headers: Content-Type, Accept, Authorization, Cookie, Cache-Control, ETag | **глубоко** | 📚 |
| 0.3.8 | HTTPS, TLS handshake (basics), certificates | **глубоко** | 📚 |
| 0.3.9 | Cookies: Set-Cookie attributes, SameSite | **глубоко** | 📚 |
| 0.3.10 | REST principles: resources, stateless, uniform interface | понимание | 📚 |
| 0.3.11 | Content types: application/json, form-urlencoded, multipart | понимание | 📚 |
| 0.3.12 | Postman / Bruno / curl — manual API testing | практика | 📚 |
| 0.3.13 | HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC) — overview | понимание | 📚 |
| 0.3.14 | Keep-Alive, connection pooling | понимание | 📚 |
| 0.3.15 | WebSockets vs HTTP — when to use | понимание | 📚 |

### Узел 0.4 — Сети (Networking basics)
**ID:** `00-networking` | **Статус:** 🔲
> **Материалы:** 📚 12/12

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 0.4.1 | OSI model vs TCP/IP model — 4 layers | понимание | 📚 |
| 0.4.2 | IP addresses, IPv4, ports, sockets | понимание | 📚 |
| 0.4.3 | TCP: 3-way handshake, reliability, flow control | **глубоко** | 📚 |
| 0.4.4 | UDP — when used (DNS, video, games) | понимание | 📚 |
| 0.4.5 | DNS: resolver, A/AAAA/CNAME records, TTL | **глубоко** | 📚 |
| 0.4.6 | localhost, 127.0.0.1, 0.0.0.0 binding | понимание | 📚 |
| 0.4.7 | Firewalls, ports 80/443/5432 — security basics | понимание | 📚 |
| 0.4.8 | Proxy vs Reverse Proxy vs Load Balancer | **глубоко** | 📚 |
| 0.4.9 | CDN — edge caching, static assets | понимание | 📚 |
| 0.4.10 | CORS — same-origin policy, preflight (preview) | понимание | 📚 |
| 0.4.11 | Latency vs Bandwidth vs Throughput | понимание | 📚 |
| 0.4.12 | traceroute / ping — basic diagnostics | практика | 📚 |

### Узел 0.5 — HTML
**ID:** `00-html` | **Статус:** 🔲
> **Материалы:** 📚 16/16

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 0.5.1 | DOCTYPE, html lang, head meta charset UTF-8 | практика | 📚 |
| 0.5.2 | Semantic layout: header, nav, main, article, section, aside, footer | практика | 📚 |
| 0.5.3 | Headings h1-h6 hierarchy, p, strong, em, mark | практика | 📚 |
| 0.5.4 | Lists: ul, ol, dl; nested lists | практика | 📚 |
| 0.5.5 | Links: a href, target, rel noopener | практика | 📚 |
| 0.5.6 | Images: img alt, figure/figcaption, picture/source | практика | 📚 |
| 0.5.7 | Forms: form, label, input types, textarea, select | практика | 📚 |
| 0.5.8 | Form validation attributes: required, pattern, min, max | практика | 📚 |
| 0.5.9 | Tables: thead, tbody, th scope — accessibility | практика | 📚 |
| 0.5.10 | DOM tree: Document, Element, Text nodes | **глубоко** | 📚 |
| 0.5.11 | Accessibility: ARIA roles, keyboard nav, focus | **глубоко** | 📚 |
| 0.5.12 | Skip links, focus visible, color contrast | понимание | 📚 |
| 0.5.13 | SEO: title, meta description, canonical, Open Graph | понимание | 📚 |
| 0.5.14 | iframe, embed — security sandbox | понимание | 📚 |
| 0.5.15 | data-* attributes, custom elements (concept) | понимание | 📚 |
| 0.5.16 | HTML validation — W3C validator | практика | 📚 |

### Узел 0.6 — CSS: основы и layout
**ID:** `00-css` | **Статус:** 🔲
> **Материалы:** 📚 0/16 · — 16

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 0.6.1 | Cascade: origin, specificity, importance | **глубоко** | — |
| 0.6.2 | Selectors: class, id, attribute, pseudo-class, pseudo-element | практика | — |
| 0.6.3 | Specificity calculation — examples | **глубоко** | — |
| 0.6.4 | Box model: content, padding, border, margin | **глубоко** | — |
| 0.6.5 | box-sizing: border-box vs content-box | понимание | — |
| 0.6.6 | Margin collapse — when and why | **глубоко** | — |
| 0.6.7 | Display: block, inline, inline-block, none, contents | понимание | — |
| 0.6.8 | Flexbox: container + item properties — full set | **глубоко** | — |
| 0.6.9 | Flexbox patterns: center, holy grail, sticky footer | практика | — |
| 0.6.10 | CSS Grid: tracks, fr, gap, template-areas | **глубоко** | — |
| 0.6.11 | Grid vs Flexbox — decision guide | **глубоко** | — |
| 0.6.12 | Position: static, relative, absolute, fixed, sticky | **глубоко** | — |
| 0.6.13 | Stacking context, z-index pitfalls | **глубоко** | — |
| 0.6.14 | Responsive: mobile-first, media queries, clamp() | практика | — |
| 0.6.15 | CSS Variables: --custom-prop, scope, inheritance | практика | — |
| 0.6.16 | BEM naming convention | практика | — |

### Узел 0.7 — CSS: продвинутое
**ID:** `00-css-advanced` | **Статус:** 🔲
> **Материалы:** 📚 0/12 · — 12

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 0.7.1 | Transitions: property, duration, easing | практика | — |
| 0.7.2 | Animations: @keyframes, transform, opacity | практика | — |
| 0.7.3 | GPU-accelerated properties — transform vs top/left | **глубоко** | — |
| 0.7.4 | Container queries (@container) | практика | — |
| 0.7.5 | :has() parent selector | практика | — |
| 0.7.6 | @layer for cascade management | понимание | — |
| 0.7.7 | Dark mode: prefers-color-scheme, color-scheme | практика | — |
| 0.7.8 | prefers-reduced-motion accessibility | понимание | — |
| 0.7.9 | Print styles @media print | понимание | — |
| 0.7.10 | CSS reset vs normalize vs modern reset | понимание | — |
| 0.7.11 | Tailwind CSS / CSS Modules — utility vs scoped (overview) | понимание | — |
| 0.7.12 | DevTools: inspect, computed styles, flex/grid overlay | практика | — |

### Узел 0.8 — Алгоритмы и структуры данных
**ID:** `00-algorithms` | **Статус:** 🔲
> **Материалы:** 📚 0/16 · — 16

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 0.8.1 | Big O: O(1), O(log n), O(n), O(n log n), O(n²), O(2^n) | **глубоко** | — |
| 0.8.2 | Time vs Space complexity trade-offs | понимание | — |
| 0.8.3 | Arrays: random access, resize cost | понимание | — |
| 0.8.4 | Linked List vs Array — when which | понимание | — |
| 0.8.5 | Hash Map / Dictionary — hashing, collisions, O(1) amortized | **глубоко** | — |
| 0.8.6 | Stack (LIFO) — call stack connection | понимание | — |
| 0.8.7 | Queue (FIFO) — BFS connection | понимание | — |
| 0.8.8 | Binary Tree, BST — search O(log n) | понимание | — |
| 0.8.9 | Graph basics — nodes, edges, adjacency | понимание | — |
| 0.8.10 | Sorting: bubble (skip), quicksort idea, built-in sort stability | понимание | — |
| 0.8.11 | Binary search — prerequisite sorted array | практика | — |
| 0.8.12 | Recursion — base case, stack overflow | **глубоко** | — |
| 0.8.13 | Two pointers technique | практика | — |
| 0.8.14 | Sliding window technique | практика | — |
| 0.8.15 | 30-40 LeetCode Easy tasks | практика | — |
| 0.8.16 | Amortized analysis — Dynamic array push | понимание | — |

### Узел 0.9 — Terminal и CLI
**ID:** `00-terminal` | **Статус:** 🔲
> **Материалы:** 📚 0/12 · — 12

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 0.9.1 | Shell: PowerShell vs Bash — navigation pwd, cd, ls/dir | практика | — |
| 0.9.2 | File ops: mkdir, cp/copy, mv/move, rm/del, touch | практика | — |
| 0.9.3 | Reading files: cat, type, less, head, tail | практика | — |
| 0.9.4 | Pipes and redirection: \ | , >, >>, 2>&1 | — |
| 0.9.5 | Environment variables: set/export, PATH | **глубоко** | — |
| 0.9.6 | Processes: ps, kill, Ctrl+C, Ctrl+Z | практика | — |
| 0.9.7 | grep/findstr, find, wc — search and count | практика | — |
| 0.9.8 | chmod, chown (Linux) — file permissions | понимание | — |
| 0.9.9 | ssh, scp — remote access basics | практика | — |
| 0.9.10 | curl for API testing from terminal | практика | — |
| 0.9.11 | dotnet CLI overview — new, build, run, test | практика | — |
| 0.9.12 | npm/npx basics — install, run, scripts | практика | — |

### Узел 0.10 — Browser и DevTools
**ID:** `00-devtools` | **Статус:** 🔲
> **Материалы:** 📚 0/12 · — 12

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 0.10.1 | Browser architecture: rendering engine, JS engine | понимание | — |
| 0.10.2 | Critical rendering path: HTML → CSSOM → Render Tree → Layout → Paint | **глубоко** | — |
| 0.10.3 | Elements panel: inspect, edit, break on DOM | практика | — |
| 0.10.4 | Console: log levels, console.table, console.time | практика | — |
| 0.10.5 | Network tab: filter, preserve log, throttling | **глубоко** | — |
| 0.10.6 | Reading request/response headers in Network | практика | — |
| 0.10.7 | Sources: breakpoints, step over/into, watch | практика | — |
| 0.10.8 | Application tab: LocalStorage, SessionStorage, Cookies | **глубоко** | — |
| 0.10.9 | Lighthouse audit — Performance, Accessibility, SEO | практика | — |
| 0.10.10 | Performance tab: flame chart basics | понимание | — |
| 0.10.11 | Mobile emulation, responsive mode | практика | — |
| 0.10.12 | Cache debugging — Disable cache, 304 responses | понимание | — |

## Фаза 1: Backend Core

### Узел 1.1 — C#: основы языка
**ID:** `01-csharp-basics` | **Статус:** 🔲
> **Материалы:** 📚 0/20 · — 20

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 1.1.1 | .NET SDK install, dotnet new console, project structure | практика | — |
| 1.1.2 | Namespaces, using, file-scoped namespaces | практика | — |
| 1.1.3 | Primitive types: int, long, float, double, decimal, bool, char | **глубоко** | — |
| 1.1.4 | string: immutability, intern pool, interpolation, verbatim | **глубоко** | — |
| 1.1.5 | var vs explicit types — readability rules | понимание | — |
| 1.1.6 | Value types vs Reference types — stack/heap diagram | **глубоко** | — |
| 1.1.7 | Boxing/unboxing — when it happens | **глубоко** | — |
| 1.1.8 | Operators: arithmetic, comparison, logical, null-coalescing | практика | — |
| 1.1.9 | Control flow: if/else, switch (classic + expression) | практика | — |
| 1.1.10 | Loops: for, while, do-while, foreach | практика | — |
| 1.1.11 | break, continue, return — flow control | практика | — |
| 1.1.12 | Methods: parameters, return, overloading | практика | — |
| 1.1.13 | ref, out, in, params — semantics | **глубоко** | — |
| 1.1.14 | Arrays: single, jagged, multidimensional | практика | — |
| 1.1.15 | Collections intro: List, Dictionary, HashSet | практика | — |
| 1.1.16 | StringBuilder vs string concatenation | **глубоко** | — |
| 1.1.17 | Enums: flags, parsing, TryParse | практика | — |
| 1.1.18 | Nullable value types: int?, DateTime?, ?? operator | понимание | — |
| 1.1.19 | const vs readonly vs static readonly | **глубоко** | — |
| 1.1.20 | Naming conventions, XML doc comments | практика | — |

### Узел 1.2 — C#: ООП
**ID:** `01-csharp-oop` | **Статус:** 🔲
> **Материалы:** 📚 0/18 · — 18

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 1.2.1 | Class blueprint, object instance, reference semantics | **глубоко** | — |
| 1.2.2 | Fields, properties (auto, full, init-only, required) | практика | — |
| 1.2.3 | Constructors, : this(), primary constructors | практика | — |
| 1.2.4 | Access modifiers: public, private, protected, internal | понимание | — |
| 1.2.5 | Encapsulation — why public fields are bad | **глубоко** | — |
| 1.2.6 | Inheritance: base, override, sealed, hidden (new) | **глубоко** | — |
| 1.2.7 | Polymorphism: virtual/override runtime dispatch | **глубоко** | — |
| 1.2.8 | Abstract classes vs Interfaces — decision guide | **глубоко** | — |
| 1.2.9 | Interface: implicit vs explicit implementation | **глубоко** | — |
| 1.2.10 | Default interface methods (C# 8+) | понимание | — |
| 1.2.11 | Composition over Inheritance — examples | **глубоко** | — |
| 1.2.12 | static members, static classes, static constructors | понимание | — |
| 1.2.13 | Records: positional, with-expressions, equality | практика | — |
| 1.2.14 | struct vs class — performance, mutability | **глубоко** | — |
| 1.2.15 | readonly struct, ref struct limitations | понимание | — |
| 1.2.16 | Object.Equals, GetHashCode, IEquatable | **глубоко** | — |
| 1.2.17 | Operator overloading (basics) | понимание | — |
| 1.2.18 | Partial classes — generated code pattern | понимание | — |

### Узел 1.3 — C#: продвинутые темы
**ID:** `01-csharp-advanced` | **Статус:** 🔲
> **Материалы:** 📚 0/30 · — 30

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 1.3.1 | Generics: classes, methods, constraints (where T) | **глубоко** | — |
| 1.3.2 | Covariance/out variance: IEnumerable, in/out keywords | **глубоко** | — |
| 1.3.3 | Delegates: declaration, multicast, -= removal | **глубоко** | — |
| 1.3.4 | Func, Action, Predicate — built-in delegates | практика | — |
| 1.3.5 | Events: add/remove accessors, memory leak pattern | **глубоко** | — |
| 1.3.6 | Lambda expressions: expression vs statement body | практика | — |
| 1.3.7 | LINQ method syntax: Where, Select, OrderBy, GroupBy | **глубоко** | — |
| 1.3.8 | LINQ query syntax — when readable | практика | — |
| 1.3.9 | Deferred execution — IEnumerable lazy evaluation | **глубоко** | — |
| 1.3.10 | Immediate execution — ToList, Count, First | понимание | — |
| 1.3.11 | IEnumerable vs IQueryable — fundamental difference | **глубоко** | — |
| 1.3.12 | Expression Trees — IQueryable provider model | **глубоко** | — |
| 1.3.13 | Pattern matching: switch, property, list, relational | практика | — |
| 1.3.14 | Extension methods — how they compile | **глубоко** | — |
| 1.3.15 | Attributes and Reflection (GetCustomAttribute) | понимание | — |
| 1.3.16 | IDisposable, using, await using, finalizers | **глубоко** | — |
| 1.3.17 | Nullable Reference Types — #nullable enable | **глубоко** | — |
| 1.3.18 | Index and Range (^1, ..) syntax | практика | — |
| 1.3.19 | Local functions vs private methods | понимание | — |
| 1.3.20 | yield return — iterator pattern | **глубоко** | — |
| 1.3.21 | LINQ: Join, GroupJoin — SQL-like joins in memory | **глубоко** | — |
| 1.3.22 | LINQ: SelectMany — flatten nested collections | **глубоко** | — |
| 1.3.23 | LINQ: Aggregate, Scan — fold operations | **глубоко** | — |
| 1.3.24 | LINQ: Any, All, Contains — existence checks | практика | — |
| 1.3.25 | LINQ: Distinct, Union, Intersect, Except | **глубоко** | — |
| 1.3.26 | LINQ: Take, Skip, TakeWhile, SkipWhile | практика | — |
| 1.3.27 | LINQ: First vs Single vs FirstOrDefault — semantics | **глубоко** | — |
| 1.3.28 | LINQ: OrderBy, ThenBy — stable sort | практика | — |
| 1.3.29 | Custom IEnumerable with yield — lazy pipelines | **глубоко** | — |
| 1.3.30 | LINQ performance — avoid multiple enumeration | **глубоко** | — |

### Узел 1.4 — C#: асинхронность ⚡
**ID:** `01-csharp-async` | **Статус:** 🔲
> **Материалы:** 📚 0/42 · — 42

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 1.4.1 | Threads 101: kernel thread, thread pool, context switch cost | **глубоко** | — |
| 1.4.2 | I/O-bound vs CPU-bound — why async helps only I/O | **глубоко** | — |
| 1.4.3 | Task class: Status, IsCompleted, Exception | **глубоко** | — |
| 1.4.4 | Task.Run — offload CPU work, don't for I/O | **глубоко** | — |
| 1.4.5 | TaskCompletionSource — manual task control | **глубоко** | — |
| 1.4.6 | async/await — compiler transformation overview | **глубоко** | — |
| 1.4.7 | State machine: IAsyncStateMachine, MoveNext disassembly | **глубоко** | — |
| 1.4.8 | ConfigureAwait(false) — library vs app code | **глубоко** | — |
| 1.4.9 | SynchronizationContext — ASP.NET Core has none | **глубоко** | — |
| 1.4.10 | Thread pool starvation — symptoms and fixes | **глубоко** | — |
| 1.4.11 | CancellationToken: Register, linked tokens, CancelAfter | **глубоко** | — |
| 1.4.12 | Task.WhenAll, WhenAny — parallel I/O | практика | — |
| 1.4.13 | async void — exception handling nightmare | **глубоко** | — |
| 1.4.14 | .Result, .Wait(), GetAwaiter().GetResult() deadlocks | **глубоко** | — |
| 1.4.15 | ValueTask — pooling, don't await twice | **глубоко** | — |
| 1.4.16 | IAsyncEnumerable — async streams | понимание | — |
| 1.4.17 | Channels — producer/consumer pattern | понимание | — |
| 1.4.18 | SemaphoreSlim for throttling | практика | — |
| 1.4.19 | Exception handling: try/catch in async, AggregateException | **глубоко** | — |
| 1.4.20 | Async all the way — no sync-over-async | **глубоко** | — |
| 1.4.21 | TaskScheduler.FromCurrentSynchronizationContext | понимание | — |
| 1.4.22 | Benchmark: sync vs async HTTP call — thread usage | практика | — |
| 1.4.23 | Awaitable pattern — GetAwaiter, INotifyCompletion | **глубоко** | — |
| 1.4.24 | Task.Factory.StartNew — why avoid, use Task.Run | **глубоко** | — |
| 1.4.25 | Parallel.ForEachAsync — bounded parallel I/O | практика | — |
| 1.4.26 | HttpClient pitfalls — DNS, socket exhaustion | **глубоко** | — |
| 1.4.27 | IHttpClientFactory — named clients, handlers | **глубоко** | — |
| 1.4.28 | Polly — retry, timeout, circuit breaker with HttpClient | **глубоко** | — |
| 1.4.29 | CancellationToken in ASP.NET — RequestAborted | **глубоко** | — |
| 1.4.30 | Fire-and-forget Task — safe patterns, traps in web apps | **глубоко** | — |
| 1.4.31 | UnobservedTaskException — global handler | **глубоко** | — |
| 1.4.32 | AsyncLocal — ambient context in async chain | понимание | — |
| 1.4.33 | Lock in async code — SemaphoreSlim vs lock | **глубоко** | — |
| 1.4.34 | BackgroundTaskQueue in ASP.NET — channel pattern | **глубоко** | — |
| 1.4.35 | IAsyncDisposable — async cleanup | **глубоко** | — |
| 1.4.36 | TimeProvider (.NET 8+) — testable delays | практика | — |
| 1.4.37 | Debugging async — Tasks window, async stack traces | практика | — |
| 1.4.38 | Interview traps: async in ctor, property getters | **глубоко** | — |
| 1.4.39 | Task vs ValueTask — decision tree | **глубоко** | — |
| 1.4.40 | End-to-end: HTTP request → service → DB async diagram | **глубоко** | — |
| 1.4.41 | Compare sync-over-async fixes in legacy code | **глубоко** | — |
| 1.4.42 | Async all-the-way checklist for ASP.NET projects | **глубоко** | — |

### Узел 1.5 — C#: .NET Runtime и память
**ID:** `01-csharp-runtime` | **Статус:** 🔲
> **Материалы:** 📚 0/16 · — 16

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 1.5.1 | CLR, managed code, IL bytecode | **глубоко** | — |
| 1.5.2 | JIT compilation: Tier 0/1/2 optimization | **глубоко** | — |
| 1.5.3 | Assembly: metadata, manifest, resources | понимание | — |
| 1.5.4 | Stack frames, call stack, stack overflow | **глубоко** | — |
| 1.5.5 | Heap allocation, object headers, alignment | **глубоко** | — |
| 1.5.6 | GC roots, reachability, mark phase | **глубоко** | — |
| 1.5.7 | Generations Gen0/Gen1/Gen2, promotion | **глубоко** | — |
| 1.5.8 | Large Object Heap (LOH), fragmentation | **глубоко** | — |
| 1.5.9 | GC modes: workstation vs server | понимание | — |
| 1.5.10 | IDisposable vs finalizer — Dispose pattern | **глубоко** | — |
| 1.5.11 | Memory leaks in managed code — event handlers, static | **глубоко** | — |
| 1.5.12 | Span, ReadOnlySpan, Memory — stack-safe slicing | **глубоко** | — |
| 1.5.13 | stackalloc — stack allocation | понимание | — |
| 1.5.14 | ArrayPool — rent/return pattern | понимание | — |
| 1.5.15 | Exception hierarchy, throw vs throw ex | понимание | — |
| 1.5.16 | NuGet: packages, transitive dependencies, Central Package Management | практика | — |

### Узел 1.6 — SQL: язык запросов
**ID:** `01-sql` | **Статус:** 🔲
> **Материалы:** 📚 0/22 · — 22

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 1.6.1 | Relational model: relation, tuple, attribute, domain | понимание | — |
| 1.6.2 | CREATE TABLE, ALTER TABLE, DROP | практика | — |
| 1.6.3 | Data types: INTEGER, VARCHAR, TEXT, BOOLEAN, TIMESTAMP, NUMERIC | понимание | — |
| 1.6.4 | PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK | **глубоко** | — |
| 1.6.5 | INSERT, UPDATE, DELETE, RETURNING | практика | — |
| 1.6.6 | SELECT: WHERE, AND/OR/NOT, IN, BETWEEN, LIKE, IS NULL | практика | — |
| 1.6.7 | ORDER BY, LIMIT, OFFSET — pagination basics | практика | — |
| 1.6.8 | INNER JOIN — matching rows only | **глубоко** | — |
| 1.6.9 | LEFT/RIGHT/FULL OUTER JOIN — preserve non-matching | **глубоко** | — |
| 1.6.10 | CROSS JOIN — cartesian product | понимание | — |
| 1.6.11 | Self-join — hierarchical data | практика | — |
| 1.6.12 | Aggregations: COUNT, SUM, AVG, MIN, MAX | практика | — |
| 1.6.13 | GROUP BY, HAVING — filter groups | **глубоко** | — |
| 1.6.14 | Subqueries: scalar, IN, EXISTS | **глубоко** | — |
| 1.6.15 | CTEs (WITH) — readable complex queries | практика | — |
| 1.6.16 | Recursive CTEs — tree traversal | понимание | — |
| 1.6.17 | Window functions: ROW_NUMBER, RANK, DENSE_RANK | **глубоко** | — |
| 1.6.18 | LAG, LEAD — compare with previous row | понимание | — |
| 1.6.19 | UNION, INTERSECT, EXCEPT | практика | — |
| 1.6.20 | CASE WHEN — conditional logic in SQL | практика | — |
| 1.6.21 | COALESCE, NULLIF — null handling | практика | — |
| 1.6.22 | DISTINCT ON (PostgreSQL) | практика | — |

### Узел 1.7 — SQL: индексы, планы, транзакции
**ID:** `01-sql-performance` | **Статус:** 🔲
> **Материалы:** 📚 0/36 · — 36

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 1.7.1 | Index purpose — avoid full table scan | **глубоко** | — |
| 1.7.2 | B-tree index structure (concept) | **глубоко** | — |
| 1.7.3 | CREATE INDEX, composite index column order | **глубоко** | — |
| 1.7.4 | Partial index (WHERE clause) | **глубоко** | — |
| 1.7.5 | Covering index (INCLUDE) | **глубоко** | — |
| 1.7.6 | EXPLAIN — reading query plan | **глубоко** | — |
| 1.7.7 | EXPLAIN ANALYZE — actual vs estimated rows | **глубоко** | — |
| 1.7.8 | Seq Scan vs Index Scan vs Bitmap Scan | **глубоко** | — |
| 1.7.9 | Nested Loop vs Hash Join vs Merge Join | **глубоко** | — |
| 1.7.10 | When index hurts — write amplification | **глубоко** | — |
| 1.7.11 | ACID: Atomicity, Consistency, Isolation, Durability | **глубоко** | — |
| 1.7.12 | BEGIN, COMMIT, ROLLBACK | практика | — |
| 1.7.13 | Isolation levels: Read Uncommitted → Serializable | **глубоко** | — |
| 1.7.14 | Dirty read, non-repeatable read, phantom read | **глубоко** | — |
| 1.7.15 | MVCC concept — readers don't block writers | **глубоко** | — |
| 1.7.16 | SELECT FOR UPDATE — pessimistic locking | **глубоко** | — |
| 1.7.17 | Deadlocks — detection, retry pattern | **глубоко** | — |
| 1.7.18 | Normalization 1NF-3NF, BCNF | **глубоко** | — |
| 1.7.19 | Denormalization — when justified | понимание | — |
| 1.7.20 | Views and Materialized Views | понимание | — |
| 1.7.21 | Functional indexes (PostgreSQL) | **глубоко** | — |
| 1.7.22 | Index-only scan — when EXPLAIN shows it | **глубоко** | — |
| 1.7.23 | Table statistics — ANALYZE, n_distinct, correlation | **глубоко** | — |
| 1.7.24 | Query planner cost model — cost, rows, width | **глубоко** | — |
| 1.7.25 | Prepared statements — plan cache, parameter sniffing | **глубоко** | — |
| 1.7.26 | Lock types: row, table, advisory (PostgreSQL) | **глубоко** | — |
| 1.7.27 | Serializable isolation — phantom reads, when to use | **глубоко** | — |
| 1.7.28 | Optimistic vs pessimistic locking — version column | **глубоко** | — |
| 1.7.29 | Read replicas — replication lag, routing reads | **глубоко** | — |
| 1.7.30 | Connection limits — max_connections vs pool size | **глубоко** | — |
| 1.7.31 | Slow query workflow — identify, EXPLAIN, fix, verify | **глубоко** | — |
| 1.7.32 | Index bloat — REINDEX, maintenance | **глубоко** | — |
| 1.7.33 | Anti-patterns: OR in WHERE, SELECT *, leading wildcard LIKE | **глубоко** | — |
| 1.7.34 | Upsert — INSERT ON CONFLICT (PostgreSQL) | **глубоко** | — |
| 1.7.35 | Lock ordering — prevent deadlocks by convention | **глубоко** | — |
| 1.7.36 | CAP theorem — relation to DB and consistency choices | **глубоко** | — |

### Узел 1.8 — PostgreSQL
**ID:** `01-postgresql` | **Статус:** 🔲
> **Материалы:** 📚 0/18 · — 18

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 1.8.1 | Install PostgreSQL, psql, pgAdmin/DBeaver | практика | — |
| 1.8.2 | CREATE DATABASE, schemas, search_path | практика | — |
| 1.8.3 | PostgreSQL types: SERIAL, UUID, JSONB, ARRAY, ENUM | **глубоко** | — |
| 1.8.4 | GENERATED ALWAYS/BY DEFAULT AS IDENTITY | понимание | — |
| 1.8.5 | Constraints: DEFERRABLE, ON DELETE CASCADE/RESTRICT | **глубоко** | — |
| 1.8.6 | Index types: B-tree, Hash, GIN, GiST, BRIN | **глубоко** | — |
| 1.8.7 | GIN index for JSONB and full-text | **глубоко** | — |
| 1.8.8 | JSONB operators: ->, ->>, @>, ?, jsonb_path | практика | — |
| 1.8.9 | Full-text search: tsvector, tsquery, to_tsvector | понимание | — |
| 1.8.10 | EXPLAIN (BUFFERS, ANALYZE) in PostgreSQL | **глубоко** | — |
| 1.8.11 | pg_stat_statements — find slow queries | **глубоко** | — |
| 1.8.12 | VACUUM, ANALYZE, autovacuum — dead tuples | **глубоко** | — |
| 1.8.13 | Connection pooling: Npgsql pool, PgBouncer | **глубоко** | — |
| 1.8.14 | Table partitioning: RANGE, LIST (basics) | понимание | — |
| 1.8.15 | Extensions: uuid-ossp, pg_trgm, citext | практика | — |
| 1.8.16 | Backup: pg_dump, pg_restore | практика | — |
| 1.8.17 | Roles, GRANT, REVOKE — permissions | практика | — |
| 1.8.18 | Listen/Notify — pub/sub in PostgreSQL | понимание | — |

### Узел 1.9 — Database Design
**ID:** `01-db-design` | **Статус:** 🔲
> **Материалы:** 📚 0/14 · — 14

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 1.9.1 | ER diagram: entities, attributes, relationships | практика | — |
| 1.9.2 | Cardinality: 1:1, 1:N, M:N — junction table | **глубоко** | — |
| 1.9.3 | Primary key strategies: int vs UUID vs ULID | **глубоко** | — |
| 1.9.4 | Surrogate vs natural keys | **глубоко** | — |
| 1.9.5 | Naming conventions: snake_case, plural tables | практика | — |
| 1.9.6 | Audit columns: created_at, updated_at, created_by | практика | — |
| 1.9.7 | Soft delete: deleted_at column + partial index | **глубоко** | — |
| 1.9.8 | Lookup/reference tables pattern | практика | — |
| 1.9.9 | Many-to-many: join entity with extra attributes | **глубоко** | — |
| 1.9.10 | Index strategy for common query patterns | **глубоко** | — |
| 1.9.11 | Avoid over-normalization in read-heavy apps | понимание | — |
| 1.9.12 | Migration workflow: dev → staging → prod | **глубоко** | — |
| 1.9.13 | Seed data scripts — idempotent inserts | практика | — |
| 1.9.14 | Multi-tenancy: shared schema + tenant_id filter | понимание | — |

### Узел 1.10 — ASP.NET Core: основы
**ID:** `01-aspnetcore-basics` | **Статус:** 🔲
> **Материалы:** 📚 0/45 · — 45

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 1.10.1 | dotnet new webapi, Program.cs top-level statements | практика | — |
| 1.10.2 | WebApplication vs Generic Host | **глубоко** | — |
| 1.10.3 | Kestrel: bindings, limits, HTTPS | **глубоко** | — |
| 1.10.4 | Middleware pipeline — order diagram | **глубоко** | — |
| 1.10.5 | Use, Run, Map, MapWhen, MapGroup | **глубоко** | — |
| 1.10.6 | Custom middleware: InvokeAsync pattern | практика | — |
| 1.10.7 | DI: AddSingleton, AddScoped, AddTransient | **глубоко** | — |
| 1.10.8 | Constructor injection vs method injection | понимание | — |
| 1.10.9 | Captive dependency problem | **глубоко** | — |
| 1.10.10 | IServiceScopeFactory in Singleton services | **глубоко** | — |
| 1.10.11 | Configuration: appsettings.json hierarchy | **глубоко** | — |
| 1.10.12 | Environment variables override, User Secrets | практика | — |
| 1.10.13 | Options pattern: IOptions vs Snapshot vs Monitor | **глубоко** | — |
| 1.10.14 | ILogger: levels, categories, scopes | **глубоко** | — |
| 1.10.15 | Routing: MapControllers, attribute routing | практика | — |
| 1.10.16 | Controllers: ApiController, Produces, Consumes | практика | — |
| 1.10.17 | IActionResult types: Ok, Created, NoContent, BadRequest | практика | — |
| 1.10.18 | Model binding sources and [FromX] attributes | **глубоко** | — |
| 1.10.19 | Model validation: DataAnnotations, ModelState | практика | — |
| 1.10.20 | FluentValidation integration | практика | — |
| 1.10.21 | Filters pipeline order | **глубоко** | — |
| 1.10.22 | Exception handling middleware vs filter | **глубоко** | — |
| 1.10.23 | CORS policy configuration | **глубоко** | — |
| 1.10.24 | Static files, wwwroot | практика | — |
| 1.10.25 | Health checks: AddHealthChecks, MapHealthChecks | практика | — |
| 1.10.26 | WebApplicationBuilder — ConfigureServices equivalent | **глубоко** | — |
| 1.10.27 | RequestDelegate — Func<HttpContext, Task> middleware | **глубоко** | — |
| 1.10.28 | Endpoint routing — endpoint metadata, order | **глубоко** | — |
| 1.10.29 | Endpoint filters (.NET 7+) — before/after handler | практика | — |
| 1.10.30 | Keyed services DI (.NET 8+) — [FromKeyedServices] | **глубоко** | — |
| 1.10.31 | Open generic registration — IRepository<> pattern | **глубоко** | — |
| 1.10.32 | IEnumerable<T> — multiple implementations injection | **глубоко** | — |
| 1.10.33 | ValidateOnStart for Options — fail fast on boot | практика | — |
| 1.10.34 | Secret management — env vars, User Secrets, Key Vault intro | **глубоко** | — |
| 1.10.35 | Serilog setup — structured logging, enrichers | практика | — |
| 1.10.36 | Log scopes — traceId, userId in middleware | практика | — |
| 1.10.37 | IExceptionHandler (.NET 8) — ProblemDetails mapping | **глубоко** | — |
| 1.10.38 | ApiBehaviorOptions — automatic 400 validation responses | **глубоко** | — |
| 1.10.39 | Development vs Production pipeline — what differs | **глубоко** | — |
| 1.10.40 | HTTPS redirection, HSTS — middleware order | **глубоко** | — |
| 1.10.41 | Request size limits — Kestrel MaxRequestBodySize | **глубоко** | — |
| 1.10.42 | Request timeouts middleware (.NET 8) | **глубоко** | — |
| 1.10.43 | Output caching middleware — GET cache profiles | понимание | — |
| 1.10.44 | Antiforgery for MVC, not needed for pure JWT API | **глубоко** | — |
| 1.10.45 | Integration test bootstrapping — WebApplicationFactory intro | **глубоко** | — |

### Узел 1.11 — ASP.NET Core: API Design
**ID:** `01-aspnetcore-api` | **Статус:** 🔲
> **Материалы:** 📚 0/40 · — 40

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 1.11.1 | REST resource naming — nouns, plural, nesting limits | **глубоко** | — |
| 1.11.2 | HTTP verbs mapping to CRUD | **глубоко** | — |
| 1.11.3 | DTOs vs Entities — never expose EF entities | **глубоко** | — |
| 1.11.4 | Request/Response DTO separation | практика | — |
| 1.11.5 | CRUD endpoints for one resource — full implementation | практика | — |
| 1.11.6 | Pagination: offset/limit vs cursor-based | **глубоко** | — |
| 1.11.7 | Filtering, sorting — query string conventions | практика | — |
| 1.11.8 | Search — full-text vs LIKE vs dedicated engine | понимание | — |
| 1.11.9 | API versioning: URL, header, query — trade-offs | **глубоко** | — |
| 1.11.10 | ProblemDetails (RFC 7807) — standardized errors | **глубоко** | — |
| 1.11.11 | Global exception handler — map exceptions to status | **глубоко** | — |
| 1.11.12 | Validation errors format — errors dictionary | практика | — |
| 1.11.13 | Swagger/OpenAPI: Swashbuckle setup, XML comments | практика | — |
| 1.11.14 | Minimal APIs vs Controllers — when which | **глубоко** | — |
| 1.11.15 | Content negotiation: Accept header | понимание | — |
| 1.11.16 | File upload: IFormFile, multipart, size limits | практика | — |
| 1.11.17 | File download: Stream, FileContentResult | практика | — |
| 1.11.18 | Rate limiting (.NET 7+) — fixed/sliding window | практика | — |
| 1.11.19 | Idempotency-Key for POST retries | понимание | — |
| 1.11.20 | HATEOAS links (basics) | понимание | — |
| 1.11.21 | PATCH — partial updates, JsonPatchDocument | практика | — |
| 1.11.22 | Bulk/batch endpoints — design and limits | **глубоко** | — |
| 1.11.23 | OpenAPI tags, examples, operationId — readable docs | практика | — |
| 1.11.24 | NSwag vs Swashbuckle — when which | понимание | — |
| 1.11.25 | Contract-first OpenAPI — generate stubs | понимание | — |
| 1.11.26 | Response envelope — when to avoid wrapping | **глубоко** | — |
| 1.11.27 | ETags — conditional GET, 304 Not Modified | **глубоко** | — |
| 1.11.28 | Cache-Control — public vs private API caching | **глубоко** | — |
| 1.11.29 | OpenAPI security schemes — Bearer JWT in Swagger UI | практика | — |
| 1.11.30 | Long polling vs SSE vs WebSocket — API design choice | **глубоко** | — |
| 1.11.31 | gRPC intro — vs REST trade-offs | понимание | — |
| 1.11.32 | API deprecation — Sunset header, version sunset policy | **глубоко** | — |
| 1.11.33 | Breaking vs non-breaking changes checklist | **глубоко** | — |
| 1.11.34 | Consumer-driven contracts intro (Pact) | понимание | — |
| 1.11.35 | Custom model binder — complex query string objects | практика | — |
| 1.11.36 | Link headers — pagination metadata (RFC 5988) | **глубоко** | — |
| 1.11.37 | 409 Conflict — concurrency, duplicate resource | **глубоко** | — |
| 1.11.38 | 422 Unprocessable Entity vs 400 — semantic errors | **глубоко** | — |
| 1.11.39 | API integration tests — HttpClient + Testcontainers | **глубоко** | — |
| 1.11.40 | OpenAPI export in CI — contract as artifact | практика | — |

### Узел 1.12 — Entity Framework Core
**ID:** `01-efcore` | **Статус:** 🔲
> **Материалы:** 📚 0/48 · — 48

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 1.12.1 | ORM concept — impedance mismatch, trade-offs | **глубоко** | — |
| 1.12.2 | DbContext as Unit of Work + Identity Map | **глубоко** | — |
| 1.12.3 | DbContext lifetime — Scoped, never Singleton | **глубоко** | — |
| 1.12.4 | DbSet, entity configuration entry points | практика | — |
| 1.12.5 | Code First: entity classes, conventions | практика | — |
| 1.12.6 | Fluent API: IEntityTypeConfiguration | **глубоко** | — |
| 1.12.7 | Data Annotations vs Fluent — when which | понимание | — |
| 1.12.8 | One-to-many relationship configuration | **глубоко** | — |
| 1.12.9 | Many-to-many with join entity (EF Core 5+) | **глубоко** | — |
| 1.12.10 | One-to-one relationship, shared PK | понимание | — |
| 1.12.11 | Cascade delete behaviors | **глубоко** | — |
| 1.12.12 | Migrations: add, update, remove, script | практика | — |
| 1.12.13 | LINQ to Entities — translatable vs not | **глубоко** | — |
| 1.12.14 | Include, ThenInclude — eager loading | **глубоко** | — |
| 1.12.15 | Filtered Include (.Where in Include) | понимание | — |
| 1.12.16 | Explicit loading: Entry().Collection().Load() | понимание | — |
| 1.12.17 | Change Tracker: EntityState enum | **глубоко** | — |
| 1.12.18 | DetectChanges, tracking vs no-tracking | **глубоко** | — |
| 1.12.19 | AsNoTracking — read-only queries | **глубоко** | — |
| 1.12.20 | Projection: Select to DTO in query | **глубоко** | — |
| 1.12.21 | Raw SQL: FromSqlRaw with parameters | практика | — |
| 1.12.22 | N+1 problem — detect via logging, fix | **глубоко** | — |
| 1.12.23 | Global Query Filters — soft delete | практика | — |
| 1.12.24 | Seeding: HasData, custom seed on startup | практика | — |
| 1.12.25 | OnConfiguring vs DI — always prefer DI | **глубоко** | — |
| 1.12.26 | EnableRetryOnFailure — transient errors (Npgsql) | **глубоко** | — |
| 1.12.27 | QuerySplittingBehavior — global vs per-query | **глубоко** | — |
| 1.12.28 | Index in Fluent API — unique, filtered, composite order | **глубоко** | — |
| 1.12.29 | Concurrency token — RowVersion, PostgreSQL xmin | **глубоко** | — |
| 1.12.30 | DbUpdateConcurrencyException — handle and retry UX | **глубоко** | — |
| 1.12.31 | Attach, Update, Entry — manual state control | **глубоко** | — |
| 1.12.32 | Graph insert — Add parent with children collection | **глубоко** | — |
| 1.12.33 | HasDefaultValueSql, computed columns | **глубоко** | — |
| 1.12.34 | EF.Functions — ILike, Collate for PostgreSQL | практика | — |
| 1.12.35 | GroupBy in LINQ — translation limits and workarounds | **глубоко** | — |
| 1.12.36 | Client evaluation — detect and eliminate | **глубоко** | — |
| 1.12.37 | IQueryable leak — don't return DbSet to callers | **глубоко** | — |
| 1.12.38 | Specification pattern — composable query objects | **глубоко** | — |
| 1.12.39 | Design-time DbContextFactory for migrations CLI | практика | — |
| 1.12.40 | Migration in CI — idempotent apply, rollback strategy | **глубоко** | — |
| 1.12.41 | Owned types intro — value object mapping | **глубоко** | — |
| 1.12.42 | Many-to-many implicit vs explicit join entity | **глубоко** | — |
| 1.12.43 | Benchmark: tracked vs AsNoTracking reads | практика | — |
| 1.12.44 | EF vs Dapper vs raw SQL — decision matrix | **глубоко** | — |
| 1.12.45 | Common EF anti-patterns catalog | **глубоко** | — |
| 1.12.46 | Testcontainers + EF — real PostgreSQL in tests | **глубоко** | — |
| 1.12.47 | InMemory provider — limits, don't trust for SQL behavior | **глубоко** | — |
| 1.12.48 | Logging SQL — LogTo, sensitive data in dev only | практика | — |

### Узел 1.13 — EF Core: продвинутое
**ID:** `01-efcore-advanced` | **Статус:** 🔲
> **Материалы:** 📚 0/35 · — 35

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 1.13.1 | Owned types — value objects in EF | **глубоко** | — |
| 1.13.2 | TPH/TPT/TPC inheritance mapping | **глубоко** | — |
| 1.13.3 | Shadow properties, backing fields | понимание | — |
| 1.13.4 | Value converters — enum as string, DateTime UTC | практика | — |
| 1.13.5 | Split queries: AsSplitQuery() — cartesian explosion | **глубоко** | — |
| 1.13.6 | Compiled queries: EF.CompileQuery | понимание | — |
| 1.13.7 | Interceptors: command, connection, save changes | **глубоко** | — |
| 1.13.8 | SaveChanges override — audit, domain events | практика | — |
| 1.13.9 | DbContext pooling — performance, caveats | **глубоко** | — |
| 1.13.10 | ExecuteUpdate/ExecuteDelete (bulk, EF Core 7+) | практика | — |
| 1.13.11 | Transaction: BeginTransaction, Commit, Rollback | **глубоко** | — |
| 1.13.12 | Resilience: retry on transient failures (Npgsql) | **глубоко** | — |
| 1.13.13 | Migration conflicts — baseline, squash | понимание | — |
| 1.13.14 | TagWith() — comment SQL for debugging | практика | — |
| 1.13.15 | EF Core logging — LogTo, sensitive data | практика | — |
| 1.13.16 | JSON columns mapping (EF Core 8+) | **глубоко** | — |
| 1.13.17 | Keyless entity types — raw SQL, views, SP results | **глубоко** | — |
| 1.13.18 | FromSqlInterpolated — safe parameterized raw SQL | **глубоко** | — |
| 1.13.19 | IDbContextFactory — create scope per operation | **глубоко** | — |
| 1.13.20 | Multiple DbContext — bounded context boundaries | **глубоко** | — |
| 1.13.21 | Audit interceptor — CreatedAt, UpdatedBy auto-fill | **глубоко** | — |
| 1.13.22 | Soft delete — global filter vs interceptor | **глубоко** | — |
| 1.13.23 | Domain events — dispatch before/after SaveChanges | **глубоко** | — |
| 1.13.24 | Temporal tables (EF Core 8) — overview | понимание | — |
| 1.13.25 | Hierarchy queries — adjacency list vs nested set | **глубоко** | — |
| 1.13.26 | Bulk extensions — when ExecuteUpdate not enough | понимание | — |
| 1.13.27 | Migration squash — baseline for existing DB | **глубоко** | — |
| 1.13.28 | SQLite vs PostgreSQL in local tests | **глубоко** | — |
| 1.13.29 | Performance tuning workflow — log, EXPLAIN, fix | **глубоко** | — |
| 1.13.30 | EF Core 9+ features watch list — stay current | понимание | — |
| 1.13.31 | Compiled model — startup time optimization | понимание | — |
| 1.13.32 | Pre/post SaveChanges interceptors chain | **глубоко** | — |
| 1.13.33 | Unit of Work pattern — DbContext already is one | **глубоко** | — |
| 1.13.34 | Repository anti-pattern debate — when skip | **глубоко** | — |
| 1.13.35 | Interview EF questions — N+1, tracking, migrations | **глубоко** | — |

### Узел 1.14 — ADO.NET и Npgsql
**ID:** `01-ado-net` | **Статус:** 🔲
> **Материалы:** 📚 0/12 · — 12

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 1.14.1 | Why ADO.NET — understand what EF does under hood | **глубоко** | — |
| 1.14.2 | Connection string, NpgsqlConnection | практика | — |
| 1.14.3 | Connection pooling — default behavior | **глубоко** | — |
| 1.14.4 | Command: NpgsqlCommand, parameters (always!) | **глубоко** | — |
| 1.14.5 | Sql injection — string concat vs parameters | **глубоко** | — |
| 1.14.6 | DataReader: Read(), GetInt32, ordinal vs name | практика | — |
| 1.14.7 | using pattern — dispose connections | **глубоко** | — |
| 1.14.8 | Transactions with ADO.NET | практика | — |
| 1.14.9 | Dapper intro — micro-ORM when EF overkill | понимание | — |
| 1.14.10 | Stored procedures call from C# | практика | — |
| 1.14.11 | Bulk insert patterns (COPY in PostgreSQL) | понимание | — |
| 1.14.12 | When raw SQL beats EF — complex reports | **глубоко** | — |

### Узел 1.15 — Middleware, Filters, Serialization
**ID:** `01-aspnetcore-middleware` | **Статус:** 🔲
> **Материалы:** 📚 0/12 · — 12

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 1.15.1 | Request lifecycle end-to-end diagram | **глубоко** | — |
| 1.15.2 | Correlation ID middleware — X-Correlation-ID | **глубоко** | — |
| 1.15.3 | Request/Response logging middleware | практика | — |
| 1.15.4 | IActionFilter — before/after action | **глубоко** | — |
| 1.15.5 | IExceptionFilter vs exception middleware | **глубоко** | — |
| 1.15.6 | Authorization filter vs middleware order | **глубоко** | — |
| 1.15.7 | System.Text.Json: JsonSerializerOptions | **глубоко** | — |
| 1.15.8 | camelCase naming, JsonPropertyName | практика | — |
| 1.15.9 | Reference handling, circular references | **глубоко** | — |
| 1.15.10 | Custom JsonConverter | понимание | — |
| 1.15.11 | Source generators for JSON (concept) | понимание | — |
| 1.15.12 | IHostApplicationLifetime — graceful shutdown | **глубоко** | — |

### Узел 1.16 — Background Jobs
**ID:** `01-background-jobs` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 1.16.1 | IHostedService lifecycle — StartAsync, StopAsync | **глубоко** | — |
| 1.16.2 | BackgroundService — ExecuteAsync loop | практика | — |
| 1.16.3 | CancellationToken in background work | **глубоко** | — |
| 1.16.4 | Scoped services in background — create scope | **глубоко** | — |
| 1.16.5 | PeriodicTimer (.NET 6+) vs Task.Delay loop | практика | — |
| 1.16.6 | Hangfire setup — SQL storage, dashboard | практика | — |
| 1.16.7 | Recurring jobs, fire-and-forget, delayed | практика | — |
| 1.16.8 | Retry policies in background jobs | **глубоко** | — |
| 1.16.9 | Idempotent job handlers | **глубоко** | — |
| 1.16.10 | Queue vs schedule — when which | понимание | — |

### Узел 1.17 — Files, Email, Notifications
**ID:** `01-files-email` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 1.17.1 | Local file storage — path traversal prevention | **глубоко** | — |
| 1.17.2 | Stream handling — copy, dispose, async read | практика | — |
| 1.17.3 | File validation — extension whitelist, magic bytes | **глубоко** | — |
| 1.17.4 | Blob storage concept — S3, Azure Blob | понимание | — |
| 1.17.5 | CDN for static assets | понимание | — |
| 1.17.6 | MailKit — send email SMTP | практика | — |
| 1.17.7 | Email templates — HTML + plain text | практика | — |
| 1.17.8 | Background email sending — don't block request | **глубоко** | — |
| 1.17.9 | Email confirmation flow design | практика | — |
| 1.17.10 | Password reset token — expiry, one-time use | **глубоко** | — |

### Узел 1.18 — Algorithms in .NET/EF
**ID:** `01-algorithms-dotnet-ef` | **Статус:** 🔲
> **Материалы:** 📚 0/25 · — 25

> **Связь с фундаментом:** применяем Big O и структуры данных из **0.8** к реальному C#, LINQ и EF Core.  
> **Prerequisites:** 0.8 (Algorithms basics), 1.3 (LINQ), 1.12 (EF Core), 1.11.6 (pagination) — желательно 1.13.

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 1.18.1 | Why algorithmic thinking in backend — latency under load, not LeetCode | понимание | — |
| 1.18.2 | Big O cheat sheet for .NET collections — List, Dictionary, HashSet, Queue | **глубоко** | — |
| 1.18.3 | `List<T>`: index O(1), Contains/IndexOf O(n), insert/remove middle O(n) | **глубоко** | — |
| 1.18.4 | Dictionary/HashSet: lookup O(1) amortized — memory vs speed trade-off | **глубоко** | — |
| 1.18.5 | Choose the right collection — decision tree for service-layer code | **глубоко** | — |
| 1.18.6 | Nested loops smell — spot O(n²) in C# during code review | **глубоко** | — |
| 1.18.7 | LINQ inside foreach — hidden in-memory N×M scans | **глубоко** | — |
| 1.18.8 | Build lookup first — GroupBy + ToDictionary before nested iteration | практика | — |
| 1.18.9 | EF N+1 — lazy load, missing Include, detect via SQL logging | **глубоко** | — |
| 1.18.10 | Cartesian explosion — multiple Include, fix with AsSplitQuery | **глубоко** | — |
| 1.18.11 | Projection wins — Select DTO in SQL vs load full entities | **глубоко** | — |
| 1.18.12 | Client-side evaluation trap — Where after AsEnumerable, filter in DB | **глубоко** | — |
| 1.18.13 | IQueryable leak — unbounded queries returned to callers | **глубоко** | — |
| 1.18.14 | Offset pagination cost — Skip(n) gets slower as n grows (PostgreSQL) | **глубоко** | — |
| 1.18.15 | Keyset/cursor pagination — stable O(limit) with EF + composite index | **глубоко** | — |
| 1.18.16 | Count() + page query — avoid double full scan when possible | **глубоко** | — |
| 1.18.17 | `Any()` vs `Count() > 0` — short-circuit and SQL translation | понимание | — |
| 1.18.18 | Load-modify-save loop vs ExecuteUpdate/ExecuteDelete — batch algorithmics | **глубоко** | — |
| 1.18.19 | In-memory join vs SQL JOIN — when to push work to PostgreSQL | **глубоко** | — |
| 1.18.20 | Compiled queries — amortize expression-tree compilation (EF.CompileQuery) | понимание | — |
| 1.18.21 | IMemoryCache / Dictionary cache — read-heavy paths, TTL, stampede basics | **глубоко** | — |
| 1.18.22 | BenchmarkDotNet intro — measure before micro-optimizing | практика | — |
| 1.18.23 | Refactoring lab — fix O(n²) in API handler (before/after) | практика | — |
| 1.18.24 | Refactoring lab — fix EF N+1 and cartesian explosion | практика | — |
| 1.18.25 | PR checklist — algorithm red flags in .NET/EF code review | **глубоко** | — |

## Фаза 2: Frontend Core

### Узел 2.1 — JavaScript: основы
**ID:** `02-javascript-basics` | **Статус:** 🔲
> **Материалы:** 📚 0/16 · — 16

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 2.1.1 | JS runtime: V8 engine, execution context | **глубоко** | — |
| 2.1.2 | var vs let vs const — hoisting, TDZ | **глубоко** | — |
| 2.1.3 | Primitive types: number, string, boolean, null, undefined, symbol, bigint | понимание | — |
| 2.1.4 | typeof quirks: typeof null, typeof array | **глубоко** | — |
| 2.1.5 | Objects: literal, property access, shorthand | практика | — |
| 2.1.6 | Arrays: push, pop, shift, unshift, slice, splice | практика | — |
| 2.1.7 | Operators, comparison (=== vs ==), truthy/falsy | **глубоко** | — |
| 2.1.8 | Control flow: if, switch, for, while, for...of, for...in | практика | — |
| 2.1.9 | Functions: declaration, expression, arrow | **глубоко** | — |
| 2.1.10 | Default parameters, rest (...args) | практика | — |
| 2.1.11 | Destructuring: object, array, nested, default | практика | — |
| 2.1.12 | Spread operator — clone, merge | практика | — |
| 2.1.13 | Optional chaining ?., nullish coalescing ?? | практика | — |
| 2.1.14 | Template literals, tagged templates | практика | — |
| 2.1.15 | Strict mode 'use strict' | понимание | — |
| 2.1.16 | Error handling: try/catch/finally, throw | практика | — |

### Узел 2.2 — JavaScript: продвинутое
**ID:** `02-javascript-advanced` | **Статус:** 🔲
> **Материалы:** 📚 0/42 · — 42

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 2.2.1 | Scope chain — lexical scoping | **глубоко** | — |
| 2.2.2 | Closures — definition, use cases, memory | **глубоко** | — |
| 2.2.3 | Closure in loop — classic bug + let fix | **глубоко** | — |
| 2.2.4 | this binding: default, implicit, explicit, new | **глубоко** | — |
| 2.2.5 | Arrow functions — no own this, no arguments | **глубоко** | — |
| 2.2.6 | call, apply, bind | **глубоко** | — |
| 2.2.7 | Prototypes: __proto__, prototype chain | **глубоко** | — |
| 2.2.8 | Object.create, class extends — syntactic sugar | **глубоко** | — |
| 2.2.9 | Map, Set, WeakMap, WeakSet | **глубоко** | — |
| 2.2.10 | Array methods: map, filter, reduce, find, some, every, flatMap | **глубоко** | — |
| 2.2.11 | Promises: states, then/catch/finally chain | **глубоко** | — |
| 2.2.12 | Promise.all, race, allSettled, any | **глубоко** | — |
| 2.2.13 | async/await — desugaring, error handling | **глубоко** | — |
| 2.2.14 | Event Loop: call stack, microtasks, macrotasks | **глубоко** | — |
| 2.2.15 | setTimeout(0) vs Promise.then order — predict output | **глубоко** | — |
| 2.2.16 | Modules ESM: import/export, dynamic import() | **глубоко** | — |
| 2.2.17 | Fetch API: GET/POST, headers, AbortController | практика | — |
| 2.2.18 | DOM: querySelector, createElement, append, remove | практика | — |
| 2.2.19 | Events: addEventListener, capture/bubble, delegation | **глубоко** | — |
| 2.2.20 | Memory leaks: listeners, closures, detached DOM | **глубоко** | — |
| 2.2.21 | Iterators, generators (function*) — basics | понимание | — |
| 2.2.22 | JSON.parse/stringify — reviver/replacer | понимание | — |
| 2.2.23 | Symbol — unique keys, well-known symbols | **глубоко** | — |
| 2.2.24 | Structured clone vs JSON — deep copy traps | **глубоко** | — |
| 2.2.25 | Object.freeze/seal — immutability levels | понимание | — |
| 2.2.26 | debounce/throttle — implement from scratch | **глубоко** | — |
| 2.2.27 | Currying and partial application | **глубоко** | — |
| 2.2.28 | typeof quirks — null is object, typeof function | **глубоко** | — |
| 2.2.29 | == vs === — coercion rules table | **глубоко** | — |
| 2.2.30 | Event loop + async/await — microtask ordering drill | **глубоко** | — |
| 2.2.31 | Web Workers — offload CPU, postMessage | понимание | — |
| 2.2.32 | localStorage/sessionStorage — JSON, quota, security | **глубоко** | — |
| 2.2.33 | CORS from browser — preflight, credentials | **глубоко** | — |
| 2.2.34 | Error types — TypeError, ReferenceError, stack | практика | — |
| 2.2.35 | Shallow vs deep copy — spread, structuredClone | **глубоко** | — |
| 2.2.36 | Optional chaining with nullish — ?. and ?? combos | практика | — |
| 2.2.37 | Array.at, Object.hasOwn — modern builtins | практика | — |
| 2.2.38 | Promise chaining errors — unhandled rejection | **глубоко** | — |
| 2.2.39 | AbortSignal.timeout — modern fetch cancellation | практика | — |
| 2.2.40 | Module pattern history — IIFE vs ESM | понимание | — |
| 2.2.41 | Interview output prediction — 10 classic snippets | **глубоко** | — |
| 2.2.42 | JS mental model summary diagram — scope, closure, loop | **глубоко** | — |

### Узел 2.3 — TypeScript
**ID:** `02-typescript` | **Статус:** 🔲
> **Материалы:** 📚 0/20 · — 20

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 2.3.1 | Why TypeScript — catch errors at compile time | понимание | — |
| 2.3.2 | Setup: tsc, tsconfig.json, strict flags | практика | — |
| 2.3.3 | Basic types: string, number, boolean, null, undefined | практика | — |
| 2.3.4 | any vs unknown vs never — decision tree | **глубоко** | — |
| 2.3.5 | Arrays, Tuples, readonly | практика | — |
| 2.3.6 | Enums vs union types + as const | **глубоко** | — |
| 2.3.7 | Functions: param types, return type, optional, default | практика | — |
| 2.3.8 | Function overloads | понимание | — |
| 2.3.9 | Interfaces vs Type aliases — when which | **глубоко** | — |
| 2.3.10 | Union (A \ | B) and Intersection (A & B) | — |
| 2.3.11 | Discriminated unions — tagged union pattern | **глубоко** | — |
| 2.3.12 | Generics: functions, interfaces, constraints | **глубоко** | — |
| 2.3.13 | keyof, typeof, indexed access types | **глубоко** | — |
| 2.3.14 | Type narrowing: typeof, instanceof, in, custom guards | **глубоко** | — |
| 2.3.15 | Utility types: Partial, Required, Pick, Omit, Record, ReturnType | **глубоко** | — |
| 2.3.16 | satisfies operator — type check without widening | понимание | — |
| 2.3.17 | Conditional types, infer keyword (intro) | понимание | — |
| 2.3.18 | Module resolution: node16, paths alias | практика | — |
| 2.3.19 | Declaration files .d.ts for JS libraries | понимание | — |
| 2.3.20 | strictNullChecks — null safety in practice | **глубоко** | — |

### Узел 2.4 — React: основы
**ID:** `02-react-basics` | **Статус:** 🔲
> **Материалы:** 📚 0/18 · — 18

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 2.4.1 | SPA vs MPA — why React | понимание | — |
| 2.4.2 | Vite + React + TypeScript project setup | практика | — |
| 2.4.3 | JSX — expressions, fragments, key prop | **глубоко** | — |
| 2.4.4 | Function components, props typing | практика | — |
| 2.4.5 | children prop, composition | практика | — |
| 2.4.6 | Virtual DOM concept | **глубоко** | — |
| 2.4.7 | Reconciliation — diffing, keys, component identity | **глубоко** | — |
| 2.4.8 | Render phase vs Commit phase | **глубоко** | — |
| 2.4.9 | useState — state, setter, functional updates | **глубоко** | — |
| 2.4.10 | Batching updates in React 18 | **глубоко** | — |
| 2.4.11 | Event handling — synthetic events | практика | — |
| 2.4.12 | Conditional rendering: &&, ternary, early return | практика | — |
| 2.4.13 | Lists — map, key={id} not index | **глубоко** | — |
| 2.4.14 | Controlled vs uncontrolled inputs | **глубоко** | — |
| 2.4.15 | Lifting state up | понимание | — |
| 2.4.16 | Props drilling problem — preview of Context | понимание | — |
| 2.4.17 | React DevTools — inspect components, props, state | практика | — |
| 2.4.18 | StrictMode — double render in dev | понимание | — |

### Узел 2.5 — React: hooks (глубоко)
**ID:** `02-react-hooks` | **Статус:** 🔲
> **Материалы:** 📚 0/38 · — 38

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 2.5.1 | Rules of Hooks — why top-level only | **глубоко** | — |
| 2.5.2 | useEffect — side effects, deps array | **глубоко** | — |
| 2.5.3 | useEffect cleanup — subscriptions, timers | **глубоко** | — |
| 2.5.4 | useEffect race conditions — AbortController fix | **глубоко** | — |
| 2.5.5 | When NOT to use useEffect — derived state | **глубоко** | — |
| 2.5.6 | useRef — DOM ref, mutable value without re-render | **глубоко** | — |
| 2.5.7 | useContext — Provider, Consumer, default value | **глубоко** | — |
| 2.5.8 | Context performance — split contexts, memoize value | **глубоко** | — |
| 2.5.9 | useReducer — reducer, dispatch, vs useState | **глубоко** | — |
| 2.5.10 | useMemo — memoize expensive computation | **глубоко** | — |
| 2.5.11 | useCallback — stable function reference | **глубоко** | — |
| 2.5.12 | When memoization hurts — premature optimization | **глубоко** | — |
| 2.5.13 | useLayoutEffect — sync before paint | **глубоко** | — |
| 2.5.14 | useId — SSR-safe unique IDs | практика | — |
| 2.5.15 | Custom hooks — extract logic, naming use* | практика | — |
| 2.5.16 | Stale closure in hooks — fix patterns | **глубоко** | — |
| 2.5.17 | useTransition, useDeferredValue (React 18) | понимание | — |
| 2.5.18 | Testing custom hooks with renderHook | практика | — |
| 2.5.19 | useEffect deps — exhaustive-deps ESLint rule | **глубоко** | — |
| 2.5.20 | useEffect vs useLayoutEffect — decision tree | **глубоко** | — |
| 2.5.21 | useRef for previous value — usePrevious pattern | **глубоко** | — |
| 2.5.22 | forwardRef + useImperativeHandle — expose child API | понимание | — |
| 2.5.23 | Custom hook: useFetch / useAsync — loading/error/data | **глубоко** | — |
| 2.5.24 | Custom hook: useDebounce / useThrottle | **глубоко** | — |
| 2.5.25 | Custom hook: useLocalStorage — sync across tabs | **глубоко** | — |
| 2.5.26 | Custom hook: useOnClickOutside, useMediaQuery | практика | — |
| 2.5.27 | State colocation — lift state down, not always up | **глубоко** | — |
| 2.5.28 | Effect deps on objects — stabilize with useMemo | **глубоко** | — |
| 2.5.29 | Strict Mode double-mount — test cleanup behavior | **глубоко** | — |
| 2.5.30 | useReducer + Context — lightweight global state | **глубоко** | — |
| 2.5.31 | useCallback deps — when missing deps cause bugs | **глубоко** | — |
| 2.5.32 | useMemo for referential equality — child re-render fix | **глубоко** | — |
| 2.5.33 | React 19: use(), useOptimistic — overview | понимание | — |
| 2.5.34 | Hook composition anti-patterns — god hooks | **глубоко** | — |
| 2.5.35 | Testing effects — waitFor, act(), fake timers | **глубоко** | — |
| 2.5.36 | Generic custom hooks — TypeScript patterns | **глубоко** | — |
| 2.5.37 | Data fetching in useEffect vs React Query — migrate | **глубоко** | — |
| 2.5.38 | Hooks cheat sheet — when to use which hook | **глубоко** | — |

### Узел 2.6 — React: routing и navigation
**ID:** `02-react-routing` | **Статус:** 🔲
> **Материалы:** 📚 0/12 · — 12

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 2.6.1 | Client-side routing vs server routing | **глубоко** | — |
| 2.6.2 | React Router v6: BrowserRouter, Routes, Route | практика | — |
| 2.6.3 | Link, NavLink — active styling | практика | — |
| 2.6.4 | useParams, useSearchParams, useNavigate | практика | — |
| 2.6.5 | Nested routes, Outlet, layout routes | **глубоко** | — |
| 2.6.6 | Index routes, default child | практика | — |
| 2.6.7 | Protected routes — auth guard pattern | **глубоко** | — |
| 2.6.8 | Redirect after login — location state | практика | — |
| 2.6.9 | 404 Not Found route | практика | — |
| 2.6.10 | Data routers: loader, action (overview) | понимание | — |
| 2.6.11 | Lazy routes + Suspense fallback | **глубоко** | — |
| 2.6.12 | Scroll restoration on navigation | понимание | — |

### Узел 2.7 — State management: server & client
**ID:** `02-react-state` | **Статус:** 🔲
> **Материалы:** 📚 0/30 · — 30

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 2.7.1 | Three types of state: local, client global, server | **глубоко** | — |
| 2.7.2 | TanStack Query setup — QueryClientProvider | практика | — |
| 2.7.3 | useQuery: queryKey, queryFn, enabled | **глубоко** | — |
| 2.7.4 | staleTime vs gcTime (cacheTime) | **глубоко** | — |
| 2.7.5 | refetchOnWindowFocus, refetchOnMount | **глубоко** | — |
| 2.7.6 | useMutation — onSuccess, onError | **глубоко** | — |
| 2.7.7 | Query invalidation — invalidateQueries | **глубоко** | — |
| 2.7.8 | Optimistic updates — onMutate, rollback | **глубоко** | — |
| 2.7.9 | Prefetching — prefetchQuery on hover | практика | — |
| 2.7.10 | Infinite queries — useInfiniteQuery | понимание | — |
| 2.7.11 | Zustand — create store, selectors | практика | — |
| 2.7.12 | When Zustand vs Context vs React Query | **глубоко** | — |
| 2.7.13 | URL as state — search params for filters | **глубоко** | — |
| 2.7.14 | Query keys — factory pattern, hierarchical keys | **глубоко** | — |
| 2.7.15 | placeholderData vs initialData — UX differences | **глубоко** | — |
| 2.7.16 | placeholderData: keepPreviousData — pagination UX | **глубоко** | — |
| 2.7.17 | Dependent queries — enabled flag chaining | **глубоко** | — |
| 2.7.18 | select option — transform without extra re-renders | **глубоко** | — |
| 2.7.19 | Mutation retry — idempotency for POST | **глубоко** | — |
| 2.7.20 | useQueries — parallel fetch multiple resources | практика | — |
| 2.7.21 | QueryClient defaults — global staleTime, gcTime | **глубоко** | — |
| 2.7.22 | TanStack Query DevTools — inspect cache | практика | — |
| 2.7.23 | Suspense + React Query — overview | понимание | — |
| 2.7.24 | persistQueryClient — offline cache basics | понимание | — |
| 2.7.25 | Zustand middleware — persist, devtools, immer | практика | — |
| 2.7.26 | Zustand selectors — avoid unnecessary re-renders | **глубоко** | — |
| 2.7.27 | Server vs client vs URL state — decision worksheet | **глубоко** | — |
| 2.7.28 | Normalize API responses in cache — byId maps | **глубоко** | — |
| 2.7.29 | Error boundaries + query error — global vs local | **глубоко** | — |
| 2.7.30 | React Query + auth — invalidate on login/logout | **глубоко** | — |

### Узел 2.8 — Build tools и tooling
**ID:** `02-build-tools` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 2.8.1 | Module bundlers — why Vite/webpack exist | **глубоко** | — |
| 2.8.2 | Vite: dev server, HMR, esbuild | **глубоко** | — |
| 2.8.3 | vite.config.ts — alias, proxy, env variables | практика | — |
| 2.8.4 | import.meta.env — VITE_ prefix | практика | — |
| 2.8.5 | Production build — tree shaking, minification | **глубоко** | — |
| 2.8.6 | ESLint + Prettier setup | практика | — |
| 2.8.7 | npm scripts, package.json dependencies vs devDependencies | понимание | — |
| 2.8.8 | package-lock.json — reproducible installs | понимание | — |
| 2.8.9 | Path aliases (@/components) | практика | — |
| 2.8.10 | Environment-specific builds — dev/staging/prod | практика | — |

### Узел 2.9 — Forms и validation
**ID:** `02-forms` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 2.9.1 | Controlled form state — single source of truth | **глубоко** | — |
| 2.9.2 | React Hook Form — register, handleSubmit | практика | — |
| 2.9.3 | Controller for custom components | практика | — |
| 2.9.4 | Zod schema validation | **глубоко** | — |
| 2.9.5 | zodResolver integration | практика | — |
| 2.9.6 | Display field errors — formState.errors | практика | — |
| 2.9.7 | Async validation — check email uniqueness | практика | — |
| 2.9.8 | Multi-step forms pattern | понимание | — |
| 2.9.9 | Form reset after submit | практика | — |
| 2.9.10 | Accessibility in forms — labels, aria-invalid | **глубоко** | — |

### Узел 2.10 — Styling и UI
**ID:** `02-styling` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 2.10.1 | CSS Modules — scoped styles in React | практика | — |
| 2.10.2 | Tailwind CSS — utility-first approach | практика | — |
| 2.10.3 | Component library choice — shadcn/ui, MUI (overview) | понимание | — |
| 2.10.4 | Responsive design in React — mobile-first | практика | — |
| 2.10.5 | Dark mode toggle — CSS variables + class | практика | — |
| 2.10.6 | Loading skeletons — UX pattern | практика | — |
| 2.10.7 | Toast notifications — success/error feedback | практика | — |
| 2.10.8 | Modal/Dialog — focus trap, escape close | **глубоко** | — |
| 2.10.9 | Error Boundaries — fallback UI | **глубоко** | — |
| 2.10.10 | Accessibility audit — axe, Lighthouse | практика | — |

### Узел 2.11 — React: performance и patterns
**ID:** `02-react-patterns` | **Статус:** 🔲
> **Материалы:** 📚 0/12 · — 12

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 2.11.1 | React.memo — when it helps | **глубоко** | — |
| 2.11.2 | Code splitting — React.lazy, Suspense | **глубоко** | — |
| 2.11.3 | List virtualization — react-window | понимание | — |
| 2.11.4 | Profiler API — measure render time | практика | — |
| 2.11.5 | Compound components pattern | **глубоко** | — |
| 2.11.6 | Render props vs HOC vs hooks — history | понимание | — |
| 2.11.7 | Container/Presentational split | понимание | — |
| 2.11.8 | Portal — modals outside root | практика | — |
| 2.11.9 | API client layer — axios instance, interceptors | **глубоко** | — |
| 2.11.10 | Type-safe API — shared types backend/frontend | **глубоко** | — |
| 2.11.11 | Feature folder structure | практика | — |
| 2.11.12 | Anti-patterns: prop drilling, giant components, useEffect for everything | **глубоко** | — |

## Фаза 3: Fullstack Integration

### Узел 3.1 — Authentication
**ID:** `03-auth` | **Статус:** 🔲
> **Материалы:** 📚 0/45 · — 45

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 3.1.1 | Authentication vs Authorization — definitions | **глубоко** | — |
| 3.1.2 | Session-based vs Token-based auth | **глубоко** | — |
| 3.1.3 | Password hashing: bcrypt/Argon2, salt, pepper | **глубоко** | — |
| 3.1.4 | ASP.NET Core Identity setup — User, Role | практика | — |
| 3.1.5 | UserManager, SignInManager — register, login | практика | — |
| 3.1.6 | JWT structure: header.payload.signature | **глубоко** | — |
| 3.1.7 | Claims — sub, email, role, custom claims | **глубоко** | — |
| 3.1.8 | Sign JWT — secret key, expiry, algorithm | **глубоко** | — |
| 3.1.9 | Validate JWT — issuer, audience, signature | **глубоко** | — |
| 3.1.10 | Access token (short) + Refresh token (long) flow | **глубоко** | — |
| 3.1.11 | Refresh token rotation — security | **глубоко** | — |
| 3.1.12 | [Authorize], [AllowAnonymous] | практика | — |
| 3.1.13 | Role-based: [Authorize(Roles = "Admin")] | практика | — |
| 3.1.14 | Policy-based authorization — custom requirements | **глубоко** | — |
| 3.1.15 | Resource-based auth — user owns entity | **глубоко** | — |
| 3.1.16 | Frontend: store tokens — memory vs httpOnly cookie | **глубоко** | — |
| 3.1.17 | Axios interceptors — attach token, refresh on 401 | **глубоко** | — |
| 3.1.18 | Protected routes on frontend | практика | — |
| 3.1.19 | Logout — invalidate refresh token | практика | — |
| 3.1.20 | OAuth 2.0 Authorization Code + PKCE overview | понимание | — |
| 3.1.21 | Identity stores — EF vs custom IUserStore | **глубоко** | — |
| 3.1.22 | Password policy — lockout, complexity, history | **глубоко** | — |
| 3.1.23 | Email confirmation — token generation, expiry | **глубоко** | — |
| 3.1.24 | Password reset — secure one-time token flow | **глубоко** | — |
| 3.1.25 | 2FA TOTP — overview and threat model | понимание | — |
| 3.1.26 | External login — Google OAuth setup end-to-end | практика | — |
| 3.1.27 | AddAuthentication → AddJwtBearer chain | **глубоко** | — |
| 3.1.28 | TokenValidationParameters — clock skew, lifetime | **глубоко** | — |
| 3.1.29 | Symmetric HS256 vs asymmetric RS256 keys | **глубоко** | — |
| 3.1.30 | JWKS endpoint — key rotation strategy | **глубоко** | — |
| 3.1.31 | Refresh token DB schema — hash, revoke, family | **глубоко** | — |
| 3.1.32 | Token revocation — blacklist vs short-lived access | **глубоко** | — |
| 3.1.33 | HttpOnly Secure SameSite cookies for refresh token | **глубоко** | — |
| 3.1.34 | CSRF with cookie auth — double-submit cookie | **глубоко** | — |
| 3.1.35 | IAuthorizationService — manual resource checks | **глубоко** | — |
| 3.1.36 | IClaimsTransformation — enrich JWT claims | **глубоко** | — |
| 3.1.37 | Multi-tenant auth — tenant_id claim, isolation | **глубоко** | — |
| 3.1.38 | API key auth — service-to-service, when OK | **глубоко** | — |
| 3.1.39 | OpenIddict — self-hosted IdP overview | понимание | — |
| 3.1.40 | Debug auth — jwt.io, decode, common misconfig | практика | — |
| 3.1.41 | Auth vulnerability checklist — OWASP auth flaws | **глубоко** | — |
| 3.1.42 | Frontend auth state — Context vs Zustand vs Query | **глубоко** | — |
| 3.1.43 | Silent refresh vs redirect login — SPA trade-offs | **глубоко** | — |
| 3.1.44 | Logout everywhere — revoke all refresh tokens | **глубоко** | — |
| 3.1.45 | Integration tests — authenticated HttpClient factory | **глубоко** | — |

### Узел 3.2 — Security (глубоко)
**ID:** `03-security` | **Статус:** 🔲
> **Материалы:** 📚 0/15 · — 15

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 3.2.1 | Threat modeling — STRIDE basics | **глубоко** | — |
| 3.2.2 | OWASP A01: Broken Access Control (IDOR) | **глубоко** | — |
| 3.2.3 | OWASP A03: Injection — SQL, XSS | **глубоко** | — |
| 3.2.4 | XSS: stored, reflected, DOM — encode output | **глубоко** | — |
| 3.2.5 | CSRF — SameSite cookies, antiforgery token | **глубоко** | — |
| 3.2.6 | CORS — preflight, credentials, misconfiguration | **глубоко** | — |
| 3.2.7 | HTTPS everywhere — HSTS, redirect HTTP→HTTPS | **глубоко** | — |
| 3.2.8 | Secure cookies: HttpOnly, Secure, SameSite | **глубоко** | — |
| 3.2.9 | Secrets management — never in git, User Secrets, env | **глубоко** | — |
| 3.2.10 | Rate limiting — brute force protection | **глубоко** | — |
| 3.2.11 | Input validation — server-side always | **глубоко** | — |
| 3.2.12 | Content Security Policy (CSP) headers | понимание | — |
| 3.2.13 | Security headers: X-Content-Type-Options, X-Frame-Options | практика | — |
| 3.2.14 | Dependency scanning — vulnerable packages | понимание | — |
| 3.2.15 | Logging security events — failed logins, not passwords | **глубоко** | — |

### Узел 3.3 — Fullstack CRUD проект
**ID:** `03-fullstack-project` | **Статус:** 🔲
> **Материалы:** 📚 0/14 · — 14

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 3.3.1 | Monorepo vs separate repos — structure decision | **глубоко** | — |
| 3.3.2 | Backend: layered structure (Controllers → Services → EF) | практика | — |
| 3.3.3 | Frontend: feature folders, shared components | практика | — |
| 3.3.4 | API client — typed wrapper, base URL, error handling | **глубоко** | — |
| 3.3.5 | CRUD for 2-3 related entities — full flow | практика | — |
| 3.3.6 | Pagination UI + backend endpoint | практика | — |
| 3.3.7 | Filtering and sorting — sync URL params | **глубоко** | — |
| 3.3.8 | Form validation — frontend Zod + backend FluentValidation | **глубоко** | — |
| 3.3.9 | Unified error format — ProblemDetails on backend, toast on frontend | **глубоко** | — |
| 3.3.10 | Loading states — skeleton, spinner, disabled buttons | практика | — |
| 3.3.11 | Optimistic UI for delete/update | практика | — |
| 3.3.12 | File upload — avatar with preview | практика | — |
| 3.3.13 | Empty states, error states UI | практика | — |
| 3.3.14 | README with setup instructions | практика | — |

### Узел 3.4 — Testing: backend
**ID:** `03-testing-backend` | **Статус:** 🔲
> **Материалы:** 📚 0/14 · — 14

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 3.4.1 | Testing pyramid — unit > integration > e2e | **глубоко** | — |
| 3.4.2 | xUnit: [Fact], [Theory], [InlineData] | практика | — |
| 3.4.3 | AAA pattern — Arrange, Act, Assert | **глубоко** | — |
| 3.4.4 | Test naming: Method_Scenario_Expected | практика | — |
| 3.4.5 | Moq: Mock, Setup, Returns, Verify | **глубоко** | — |
| 3.4.6 | Mock vs Stub vs Fake — when which | **глубоко** | — |
| 3.4.7 | Unit test service layer — mock DbContext/IRepository | практика | — |
| 3.4.8 | Unit test validators — FluentValidation | практика | — |
| 3.4.9 | WebApplicationFactory — integration test setup | **глубоко** | — |
| 3.4.10 | Override DI services in tests | **глубоко** | — |
| 3.4.11 | Testcontainers — real PostgreSQL in test | **глубоко** | — |
| 3.4.12 | Test auth — mock JWT or test user seed | практика | — |
| 3.4.13 | Integration test CRUD endpoints | практика | — |
| 3.4.14 | Code coverage — meaningful vs vanity metrics | понимание | — |

### Узел 3.5 — Testing: frontend & E2E
**ID:** `03-testing-frontend` | **Статус:** 🔲
> **Материалы:** 📚 0/14 · — 14

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 3.5.1 | Vitest setup with React Testing Library | практика | — |
| 3.5.2 | RTL philosophy — test behavior, not implementation | **глубоко** | — |
| 3.5.3 | Query priority: getByRole > getByLabelText > getByText | **глубоко** | — |
| 3.5.4 | userEvent vs fireEvent | **глубоко** | — |
| 3.5.5 | Testing forms — fill, submit, assert result | практика | — |
| 3.5.6 | Testing async — waitFor, findBy | **глубоко** | — |
| 3.5.7 | MSW — mock API handlers in tests | **глубоко** | — |
| 3.5.8 | Testing components with React Query — wrapper | практика | — |
| 3.5.9 | Testing custom hooks — renderHook | практика | — |
| 3.5.10 | Snapshot tests — when useful, when harmful | **глубоко** | — |
| 3.5.11 | Playwright setup — E2E test project | практика | — |
| 3.5.12 | E2E: login flow, CRUD flow | практика | — |
| 3.5.13 | Flaky tests — causes and fixes | **глубоко** | — |
| 3.5.14 | CI: run all test suites on push | практика | — |

### Узел 3.6 — Error handling & Resilience
**ID:** `03-resilience` | **Статус:** 🔲
> **Материалы:** 📚 0/12 · — 12

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 3.6.1 | Exception hierarchy in API — map to HTTP status | **глубоко** | — |
| 3.6.2 | Global exception handler middleware | **глубоко** | — |
| 3.6.3 | ProblemDetails — consistent error response | **глубоко** | — |
| 3.6.4 | Validation errors — 400 with field details | практика | — |
| 3.6.5 | Not found vs Forbidden — 404 vs 403 semantics | **глубоко** | — |
| 3.6.6 | Retry pattern — Polly (concept) | понимание | — |
| 3.6.7 | Circuit breaker — fail fast when downstream down | понимание | — |
| 3.6.8 | Timeout configuration — HttpClient, DB command | **глубоко** | — |
| 3.6.9 | Frontend error boundaries — catch render errors | **глубоко** | — |
| 3.6.10 | React Query retry and error handling | **глубоко** | — |
| 3.6.11 | Graceful degradation — partial UI failure | понимание | — |
| 3.6.12 | Health check endpoint — DB connectivity | практика | — |

### Узел 3.7 — API Integration patterns
**ID:** `03-api-patterns` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 3.7.1 | REST client design — resource-oriented methods | **глубоко** | — |
| 3.7.2 | Shared DTO types — manual vs OpenAPI codegen | **глубоко** | — |
| 3.7.3 | Pagination response envelope — items, total, page | практика | — |
| 3.7.4 | Long polling vs WebSocket vs SSE — when which | **глубоко** | — |
| 3.7.5 | Webhook outbound — sign payload, retry | понимание | — |
| 3.7.6 | API versioning in practice — /api/v1/ | практика | — |
| 3.7.7 | Bulk operations — batch create/update | практика | — |
| 3.7.8 | Export CSV/Excel endpoint | практика | — |
| 3.7.9 | Import with validation — partial success | понимание | — |
| 3.7.10 | OpenAPI as contract — generate client | практика | — |

## Фаза 4: Architecture & Patterns

### Узел 4.1 — SOLID Principles
**ID:** `04-solid` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 4.1.1 | SRP — one reason to change, code smell examples | **глубоко** | — |
| 4.1.2 | OCP — extend without modify, strategy pattern | **глубоко** | — |
| 4.1.3 | LSP — substitutability, rectangle/square problem | **глубоко** | — |
| 4.1.4 | ISP — fat interfaces split | **глубоко** | — |
| 4.1.5 | DIP — depend on abstractions, DI connection | **глубоко** | — |
| 4.1.6 | Refactoring exercise: God class → SRP | практика | — |
| 4.1.7 | Refactoring exercise: switch statement → Strategy | практика | — |
| 4.1.8 | SOLID in React — component responsibility | понимание | — |
| 4.1.9 | When SOLID is overkill — YAGNI balance | **глубоко** | — |
| 4.1.10 | Code review checklist based on SOLID | практика | — |

### Узел 4.2 — Design Patterns (GoF)
**ID:** `04-patterns` | **Статус:** 🔲
> **Материалы:** 📚 0/16 · — 16

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 4.2.1 | Pattern categories: Creational, Structural, Behavioral | понимание | — |
| 4.2.2 | Factory Method / Simple Factory | **глубоко** | — |
| 4.2.3 | Abstract Factory (concept) | понимание | — |
| 4.2.4 | Builder — complex object construction | **глубоко** | — |
| 4.2.5 | Singleton — thread safety, DI as better alternative | **глубоко** | — |
| 4.2.6 | Adapter — wrap incompatible interface | **глубоко** | — |
| 4.2.7 | Decorator — add behavior dynamically | **глубоко** | — |
| 4.2.8 | Facade — simplify subsystem | **глубоко** | — |
| 4.2.9 | Proxy — lazy loading, access control | понимание | — |
| 4.2.10 | Strategy — interchangeable algorithms | **глубоко** | — |
| 4.2.11 | Observer — event notification | **глубоко** | — |
| 4.2.12 | Command — encapsulate request, undo | **глубоко** | — |
| 4.2.13 | Template Method — algorithm skeleton | понимание | — |
| 4.2.14 | Repository + Unit of Work — EF overlap | **глубоко** | — |
| 4.2.15 | Mediator — MediatR in .NET | **глубоко** | — |
| 4.2.16 | When pattern is over-engineering | **глубоко** | — |

### Узел 4.3 — Clean Architecture
**ID:** `04-clean-architecture` | **Статус:** 🔲
> **Материалы:** 📚 0/33 · — 33

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 4.3.1 | Layers: Domain, Application, Infrastructure, Presentation | **глубоко** | — |
| 4.3.2 | Dependency Rule — arrows point inward | **глубоко** | — |
| 4.3.3 | Domain layer — no framework dependencies | **глубоко** | — |
| 4.3.4 | Entities — business objects with behavior | **глубоко** | — |
| 4.3.5 | Value Objects — immutable, equality by value | **глубоко** | — |
| 4.3.6 | Application Services / Use Cases | **глубоко** | — |
| 4.3.7 | Interfaces in Application, implementations in Infrastructure | **глубоко** | — |
| 4.3.8 | DTOs at boundaries — never leak entities | **глубоко** | — |
| 4.3.9 | Project structure — .csproj per layer | практика | — |
| 4.3.10 | Refactor CRUD project to Clean Architecture | практика | — |
| 4.3.11 | Vertical Slice Architecture — alternative | **глубоко** | — |
| 4.3.12 | Feature folders vs layer folders | **глубоко** | — |
| 4.3.13 | Testability benefit — mock at boundaries | **глубоко** | — |
| 4.3.14 | Ports and Adapters (Hexagonal) — same dependency rule | **глубоко** | — |
| 4.3.15 | Onion Architecture — layer mapping to Clean | понимание | — |
| 4.3.16 | Domain primitives — Result<T>, Error value types | **глубоко** | — |
| 4.3.17 | Guard clauses — fail fast in domain constructors | **глубоко** | — |
| 4.3.18 | Domain invariants — enforce on every state change | **глубоко** | — |
| 4.3.19 | Application layer — validators, DTO mappers | **глубоко** | — |
| 4.3.20 | Mapster vs AutoMapper — boundary mapping choice | понимание | — |
| 4.3.21 | Infrastructure — EF repos implement Application ports | **глубоко** | — |
| 4.3.22 | Presentation — thin controllers, MediatR dispatch | **глубоко** | — |
| 4.3.23 | Cross-cutting — logging, caching layer placement | **глубоко** | — |
| 4.3.24 | Domain events vs integration events — boundaries | **глубоко** | — |
| 4.3.25 | Shared Kernel — when shared project is OK | **глубоко** | — |
| 4.3.26 | Anti-Corruption Layer in Infrastructure adapters | **глубоко** | — |
| 4.3.27 | Solution layout — src/tests per layer | практика | — |
| 4.3.28 | Architecture tests — NetArchTest dependency rules | **глубоко** | — |
| 4.3.29 | Enforce dependency direction in CI | **глубоко** | — |
| 4.3.30 | Modular monolith — Clean Architecture modules | **глубоко** | — |
| 4.3.31 | Common mistakes — anemic domain, leaky EF entities | **глубоко** | — |
| 4.3.32 | Migration from CRUD — strangler steps | **глубоко** | — |
| 4.3.33 | Capstone architecture checklist — before coding | практика | — |

### Узел 4.4 — DDD и CQRS
**ID:** `04-ddd-cqrs` | **Статус:** 🔲
> **Материалы:** 📚 0/14 · — 14

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 4.4.1 | Ubiquitous Language — dev + business same terms | **глубоко** | — |
| 4.4.2 | Bounded Context — separate models per domain | **глубоко** | — |
| 4.4.3 | Entity vs Value Object vs Aggregate Root | **глубоко** | — |
| 4.4.4 | Aggregate — consistency boundary, reference by ID | **глубоко** | — |
| 4.4.5 | Domain Events — decouple side effects | **глубоко** | — |
| 4.4.6 | CQRS — separate read and write models | **глубоко** | — |
| 4.4.7 | Commands — mutate state, return Result | **глубоко** | — |
| 4.4.8 | Queries — read-only, can bypass domain | **глубоко** | — |
| 4.4.9 | MediatR — IRequest, IRequestHandler, pipeline behaviors | практика | — |
| 4.4.10 | Validation behavior in MediatR pipeline | практика | — |
| 4.4.11 | Outbox Pattern — reliable event publishing | **глубоко** | — |
| 4.4.12 | Eventual Consistency — accept temporary inconsistency | **глубоко** | — |
| 4.4.13 | When DDD/CQRS justified vs overkill | **глубоко** | — |
| 4.4.14 | Anemic domain model — anti-pattern | **глубоко** | — |

### Узел 4.5 — Refactoring
**ID:** `04-refactoring` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 4.5.1 | Code smells catalog — long method, feature envy, etc. | **глубоко** | — |
| 4.5.2 | Extract Method — break down long functions | практика | — |
| 4.5.3 | Extract Class — split God class | практика | — |
| 4.5.4 | Replace Conditional with Polymorphism | практика | — |
| 4.5.5 | Introduce Parameter Object | практика | — |
| 4.5.6 | Replace Magic Numbers with constants | практика | — |
| 4.5.7 | Boy Scout Rule — leave code better | понимание | — |
| 4.5.8 | Refactoring with tests — safety net | **глубоко** | — |
| 4.5.9 | Technical debt — identify, prioritize, pay down | **глубоко** | — |
| 4.5.10 | Legacy code — characterization tests | понимание | — |

### Узел 4.6 — API & Integration Architecture
**ID:** `04-api-architecture` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 4.6.1 | Monolith vs Microservices — trade-offs | **глубоко** | — |
| 4.6.2 | Modular Monolith — middle ground | **глубоко** | — |
| 4.6.3 | Sync REST vs Async messaging — when which | **глубоко** | — |
| 4.6.4 | API Gateway pattern — routing, auth, rate limit | понимание | — |
| 4.6.5 | BFF (Backend for Frontend) pattern | понимание | — |
| 4.6.6 | Strangler Fig — gradual migration | понимание | — |
| 4.6.7 | Anti-Corruption Layer — external API wrapper | **глубоко** | — |
| 4.6.8 | Result Pattern — explicit success/failure | **глубоко** | — |
| 4.6.9 | Specification Pattern — composable queries | понимание | — |
| 4.6.10 | Idempotency in distributed systems | **глубоко** | — |

### Узел 4.7 — Concurrency & Parallelism
**ID:** `04-concurrency` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 4.7.1 | Thread safety — shared mutable state | **глубоко** | — |
| 4.7.2 | lock, Monitor, SemaphoreSlim | **глубоко** | — |
| 4.7.3 | ConcurrentDictionary, ConcurrentBag | практика | — |
| 4.7.4 | Race conditions — detect and fix | **глубоко** | — |
| 4.7.5 | Deadlocks — prevention, timeout | **глубоко** | — |
| 4.7.6 | Parallel.ForEach vs async — CPU vs I/O | **глубоко** | — |
| 4.7.7 | Immutable objects — thread-safe by design | **глубоко** | — |
| 4.7.8 | DbContext thread safety — one per request | **глубоко** | — |
| 4.7.9 | Optimistic concurrency — row version/timestamp | **глубоко** | — |
| 4.7.10 | Distributed locks with Redis (concept) | понимание | — |

### Узел 4.8 — Microservices intro
**ID:** `04-microservices` | **Статус:** 🔲
> **Материалы:** 📚 0/9 · — 9

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 4.8.1 | When to split — bounded context, team size | **глубоко** | — |
| 4.8.2 | Service communication — sync HTTP vs async queue | **глубоко** | — |
| 4.8.3 | Service discovery (concept) | понимание | — |
| 4.8.4 | Distributed tracing — correlation across services | **глубоко** | — |
| 4.8.5 | Saga pattern — distributed transactions | понимание | — |
| 4.8.6 | CAP theorem — CP vs AP | **глубоко** | — |
| 4.8.7 | Data ownership — each service owns its DB | **глубоко** | — |
| 4.8.8 | Challenges: debugging, deployment, consistency | **глубоко** | — |
| 4.8.9 | When monolith is the right choice | **глубоко** | — |

## Фаза 5: Production & DevOps

### Узел 5.1 — Docker
**ID:** `05-docker` | **Статус:** 🔲
> **Материалы:** 📚 0/15 · — 15

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 5.1.1 | Containers vs VMs — namespaces, cgroups | **глубоко** | — |
| 5.1.2 | Images vs Containers — layers, copy-on-write | **глубоко** | — |
| 5.1.3 | Dockerfile: FROM, WORKDIR, COPY, RUN, EXPOSE | **глубоко** | — |
| 5.1.4 | CMD vs ENTRYPOINT — override behavior | **глубоко** | — |
| 5.1.5 | Multi-stage build — sdk → aspnet runtime | **глубоко** | — |
| 5.1.6 | .dockerignore — exclude bin, obj, node_modules | практика | — |
| 5.1.7 | Non-root user in container — security | **глубоко** | — |
| 5.1.8 | docker-compose.yml — services, networks, volumes | **глубоко** | — |
| 5.1.9 | Compose: app + postgres + redis stack | практика | — |
| 5.1.10 | depends_on vs healthcheck condition | **глубоко** | — |
| 5.1.11 | Environment variables in compose | практика | — |
| 5.1.12 | Frontend Docker — node build → nginx serve | практика | — |
| 5.1.13 | Docker volumes — persist PostgreSQL data | практика | — |
| 5.1.14 | docker logs, exec, ps — debugging | практика | — |
| 5.1.15 | Image size optimization — alpine, layer caching | **глубоко** | — |

### Узел 5.2 — CI/CD
**ID:** `05-cicd` | **Статус:** 🔲
> **Материалы:** 📚 0/14 · — 14

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 5.2.1 | CI vs CD — continuous integration vs deployment | **глубоко** | — |
| 5.2.2 | Pipeline stages: build → test → lint → deploy | **глубоко** | — |
| 5.2.3 | GitHub Actions: workflow, job, step, runs-on | практика | — |
| 5.2.4 | Trigger: push, pull_request, workflow_dispatch | практика | — |
| 5.2.5 | Backend CI: dotnet restore, build, test | практика | — |
| 5.2.6 | Frontend CI: npm ci, lint, test, build | практика | — |
| 5.2.7 | Cache dependencies — actions/cache | практика | — |
| 5.2.8 | Secrets in CI — GitHub Secrets, never log | **глубоко** | — |
| 5.2.9 | Environment: staging, production — protection rules | практика | — |
| 5.2.10 | Deploy to staging — Docker push, SSH deploy (basics) | практика | — |
| 5.2.11 | Database migrations in deploy pipeline | **глубоко** | — |
| 5.2.12 | Fail fast — test before merge | **глубоко** | — |
| 5.2.13 | Branch protection rules — require CI pass | практика | — |
| 5.2.14 | Semantic versioning + git tags for releases | практика | — |

### Узел 5.3 — Linux Server (basics)
**ID:** `05-linux` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 5.3.1 | SSH key authentication — disable password login | **глубоко** | — |
| 5.3.2 | systemd — start/stop/enable services | практика | — |
| 5.3.3 | File permissions: chmod, chown, umask | **глубоко** | — |
| 5.3.4 | Process management: htop, kill, signals | практика | — |
| 5.3.5 | Logs: journalctl, /var/log | практика | — |
| 5.3.6 | Firewall: ufw basics — allow 80, 443, 22 | практика | — |
| 5.3.7 | Cron jobs — scheduled tasks | практика | — |
| 5.3.8 | Disk usage: df, du — monitor space | практика | — |
| 5.3.9 | Environment variables in systemd unit files | практика | — |
| 5.3.10 | Basic troubleshooting — port in use, permission denied | **глубоко** | — |

### Узел 5.4 — Nginx
**ID:** `05-nginx` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 5.4.1 | Reverse proxy — forward requests to backend | **глубоко** | — |
| 5.4.2 | Static file serving — React build in /var/www | практика | — |
| 5.4.3 | location blocks — /api → backend, / → frontend | **глубоко** | — |
| 5.4.4 | SSL termination — Let's Encrypt, certbot | практика | — |
| 5.4.5 | gzip compression — reduce payload size | практика | — |
| 5.4.6 | Proxy headers — X-Forwarded-For, X-Real-IP | **глубоко** | — |
| 5.4.7 | Load balancing — upstream block (basics) | понимание | — |
| 5.4.8 | Rate limiting in nginx — limit_req | понимание | — |
| 5.4.9 | WebSocket proxy — Upgrade header | практика | — |
| 5.4.10 | nginx + Docker — official image config | практика | — |

### Узел 5.5 — Redis и кэширование
**ID:** `05-redis` | **Статус:** 🔲
> **Материалы:** 📚 0/12 · — 12

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 5.5.1 | Why cache — latency, DB load reduction | **глубоко** | — |
| 5.5.2 | Cache-aside pattern — read, write, invalidate | **глубоко** | — |
| 5.5.3 | Redis data types: string, hash, list, set, sorted set | **глубоко** | — |
| 5.5.4 | TTL — expiration strategies | **глубоко** | — |
| 5.5.5 | IDistributedCache in ASP.NET Core | практика | — |
| 5.5.6 | Cache invalidation — hardest problem | **глубоко** | — |
| 5.5.7 | Cache stampede — prevention (lock, early expiry) | **глубоко** | — |
| 5.5.8 | Session storage in Redis — scale-out ready | **глубоко** | — |
| 5.5.9 | Pub/Sub — simple messaging | понимание | — |
| 5.5.10 | Distributed lock — RedLock (concept) | понимание | — |
| 5.5.11 | Redis in docker-compose | практика | — |
| 5.5.12 | When NOT to cache — stale data tolerance | **глубоко** | — |

### Узел 5.6 — SignalR (real-time)
**ID:** `05-signalr` | **Статус:** 🔲
> **Материалы:** 📚 0/11 · — 11

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 5.6.1 | Real-time transports: WebSocket, SSE, Long Polling | **глубоко** | — |
| 5.6.2 | SignalR negotiation — automatic fallback | **глубоко** | — |
| 5.6.3 | Hub class — server methods, client callbacks | практика | — |
| 5.6.4 | Clients.All, Group, User, Caller | практика | — |
| 5.6.5 | Strongly typed hubs — IHubContext | практика | — |
| 5.6.6 | Authentication in SignalR — JWT via query string | **глубоко** | — |
| 5.6.7 | @microsoft/signalr client in React | практика | — |
| 5.6.8 | Reconnection — automatic reconnect handling | **глубоко** | — |
| 5.6.9 | Scale-out — Redis backplane | **глубоко** | — |
| 5.6.10 | Use case: live notifications, chat, dashboard updates | практика | — |
| 5.6.11 | SignalR vs polling — trade-offs | **глубоко** | — |

### Узел 5.7 — Message Queues
**ID:** `05-messaging` | **Статус:** 🔲
> **Материалы:** 📚 0/11 · — 11

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 5.7.1 | Sync vs async communication — coupling, latency | **глубоко** | — |
| 5.7.2 | Message broker concept — RabbitMQ architecture | **глубоко** | — |
| 5.7.3 | Queue vs Topic vs Fanout exchange | **глубоко** | — |
| 5.7.4 | MassTransit setup — publish, consume | практика | — |
| 5.7.5 | Message contract — immutable DTO | **глубоко** | — |
| 5.7.6 | Retry policy — exponential backoff | **глубоко** | — |
| 5.7.7 | Dead letter queue — poison messages | **глубоко** | — |
| 5.7.8 | Idempotent consumer — handle duplicates | **глубоко** | — |
| 5.7.9 | Outbox Pattern — DB + message atomicity | **глубоко** | — |
| 5.7.10 | Event vs Command messages | **глубоко** | — |
| 5.7.11 | When messaging vs direct HTTP call | **глубоко** | — |

### Узел 5.8 — Observability
**ID:** `05-observability` | **Статус:** 🔲
> **Материалы:** 📚 0/12 · — 12

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 5.8.1 | Three pillars: logs, metrics, traces | **глубоко** | — |
| 5.8.2 | Serilog setup — structured logging, sinks | **глубоко** | — |
| 5.8.3 | Log enrichers — MachineName, Environment | практика | — |
| 5.8.4 | Correlation ID — middleware, propagate to logs | **глубоко** | — |
| 5.8.5 | What to log / what NOT to log — PII, passwords | **глубоко** | — |
| 5.8.6 | Log levels — Debug in dev, Warning+ in prod | **глубоко** | — |
| 5.8.7 | Health checks — liveness vs readiness | **глубоко** | — |
| 5.8.8 | Metrics — request duration, error rate (concept) | понимание | — |
| 5.8.9 | OpenTelemetry — Activity, Span (basics) | понимание | — |
| 5.8.10 | Alerting — when to wake up on-call (concept) | понимание | — |
| 5.8.11 | Frontend error tracking — Sentry overview (hands-on in **14.10**) | понимание | — |
| 5.8.12 | Dashboard — Grafana basics (concept) | понимание | — |

### Узел 5.9 — Performance optimization
**ID:** `05-performance` | **Статус:** 🔲
> **Материалы:** 📚 0/12 · — 12

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 5.9.1 | Measure first — don't guess bottlenecks | **глубоко** | — |
| 5.9.2 | Backend profiling — dotnet-counters, dotnet-trace | практика | — |
| 5.9.3 | SQL slow query analysis — EXPLAIN, pg_stat | **глубоко** | — |
| 5.9.4 | N+1 detection — EF logging, fix with Include/Select | **глубоко** | — |
| 5.9.5 | Connection pool tuning — Npgsql settings | **глубоко** | — |
| 5.9.6 | Response compression — gzip/brotli middleware | практика | — |
| 5.9.7 | Frontend: Lighthouse audit, Core Web Vitals | **глубоко** | — |
| 5.9.8 | Bundle analysis — vite-plugin-visualizer | практика | — |
| 5.9.9 | Image optimization — lazy loading, WebP, sizes | практика | — |
| 5.9.10 | React performance — unnecessary re-renders | **глубоко** | — |
| 5.9.11 | Pagination vs infinite scroll — performance trade-off | **глубоко** | — |
| 5.9.12 | Load testing basics — k6 or bombardier (concept) | понимание | — |

### Узел 5.10 — Database scaling (intro)
**ID:** `05-db-scaling` | **Статус:** 🔲
> **Материалы:** 📚 0/8 · — 8

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 5.10.1 | Vertical vs horizontal scaling | **глубоко** | — |
| 5.10.2 | Read replicas — offload read queries | **глубоко** | — |
| 5.10.3 | Connection pooling — PgBouncer transaction mode | **глубоко** | — |
| 5.10.4 | Index maintenance — REINDEX, bloat monitoring | **глубоко** | — |
| 5.10.5 | Partitioning large tables — when and how | понимание | — |
| 5.10.6 | Archiving old data — soft delete vs move | понимание | — |
| 5.10.7 | Sharding (concept) — split data across DBs | понимание | — |
| 5.10.8 | CAP in database context | **глубоко** | — |

### Узел 5.11 — Security hardening (production)
**ID:** `05-security-prod` | **Статус:** 🔲
> **Материалы:** 📚 0/8 · — 8

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 5.11.1 | Production checklist — HTTPS, secrets, headers | **глубоко** | — |
| 5.11.2 | Disable detailed errors in production | **глубоко** | — |
| 5.11.3 | Database user permissions — least privilege | **глубоко** | — |
| 5.11.4 | Container security — non-root, read-only filesystem | **глубоко** | — |
| 5.11.5 | Dependency audit — dotnet list package --vulnerable | практика | — |
| 5.11.6 | WAF concept — Web Application Firewall | понимание | — |
| 5.11.7 | Backup strategy — DB backup, test restore | **глубоко** | — |
| 5.11.8 | Incident response basics — detect, contain, recover | понимание | — |

### Узел 5.12 — gRPC (intro)
**ID:** `05-grpc` | **Статус:** 🔲
> **Материалы:** 📚 0/5 · — 5

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 5.12.1 | gRPC vs REST — binary, HTTP/2, streaming | **глубоко** | — |
| 5.12.2 | Protocol Buffers — .proto schema | понимание | — |
| 5.12.3 | grpc-dotnet service setup (overview) | понимание | — |
| 5.12.4 | When gRPC vs REST — internal vs public API | **глубоко** | — |
| 5.12.5 | gRPC-Web — browser compatibility | понимание | — |

## Фаза 6: Craft (Мастерство разработчика)

### Узел 6.1 — Code Review
**ID:** `06-code-review` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 6.1.1 | Purpose of code review — quality, knowledge sharing | **глубоко** | — |
| 6.1.2 | What to look for — logic, readability, tests, security | **глубоко** | — |
| 6.1.3 | Review comments — constructive, specific, suggest fix | **глубоко** | — |
| 6.1.4 | Nit vs blocking comment — prioritize | понимание | — |
| 6.1.5 | Review your own PR before requesting review | практика | — |
| 6.1.6 | Small PRs — easier to review, faster merge | **глубоко** | — |
| 6.1.7 | PR description template — what, why, how to test | практика | — |
| 6.1.8 | Review exercises — find bugs in sample diffs | практика | — |
| 6.1.9 | Responding to review — don't take personally | понимание | — |
| 6.1.10 | Automated checks — lint, tests before human review | **глубоко** | — |

### Узел 6.2 — Debugging
**ID:** `06-debugging` | **Статус:** 🔲
> **Материалы:** 📚 0/12 · — 12

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 6.2.1 | Scientific method — reproduce, hypothesize, test | **глубоко** | — |
| 6.2.2 | Read the error message — stack trace top to bottom | **глубоко** | — |
| 6.2.3 | VS/Rider debugger — breakpoints, step, watch, evaluate | **глубоко** | — |
| 6.2.4 | Conditional breakpoints — hit count, when true | практика | — |
| 6.2.5 | Browser DevTools debugger — sources, breakpoints | практика | — |
| 6.2.6 | Network tab — inspect failed requests | **глубоко** | — |
| 6.2.7 | SQL debugging — EXPLAIN, log queries | **глубоко** | — |
| 6.2.8 | Binary search — narrow down bug location | **глубоко** | — |
| 6.2.9 | Logging for debugging vs logging for ops | **глубоко** | — |
| 6.2.10 | Heisenbug — race conditions, timing issues | **глубоко** | — |
| 6.2.11 | Rubber duck debugging — explain problem aloud | понимание | — |
| 6.2.12 | Debug scenarios — practice 5 real-world bugs | практика | — |

### Узел 6.3 — System Design (basics)
**ID:** `06-system-design` | **Статус:** 🔲
> **Материалы:** 📚 0/12 · — 12

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 6.3.1 | Functional vs non-functional requirements | **глубоко** | — |
| 6.3.2 | Back-of-envelope — QPS, storage, bandwidth | **глубоко** | — |
| 6.3.3 | High-level diagram — client, LB, app, DB, cache | **глубоко** | — |
| 6.3.4 | C4 Model — Context, Container diagrams | практика | — |
| 6.3.5 | Sequence diagram — auth flow, order flow | практика | — |
| 6.3.6 | Stateless app servers — horizontal scaling | **глубоко** | — |
| 6.3.7 | Database as bottleneck — cache, read replicas | **глубоко** | — |
| 6.3.8 | CDN for static assets | понимание | — |
| 6.3.9 | Design URL shortener (exercise) | практика | — |
| 6.3.10 | Design todo app at scale (exercise) | практика | — |
| 6.3.11 | Trade-offs — consistency vs availability vs partition | **глубоко** | — |
| 6.3.12 | ADR — Architecture Decision Record template | практика | — |

### Узел 6.4 — Technical Writing
**ID:** `06-technical-writing` | **Статус:** 🔲
> **Материалы:** 📚 0/8 · — 8

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 6.4.1 | README structure — setup, run, test, deploy | практика | — |
| 6.4.2 | API documentation — Swagger + examples | практика | — |
| 6.4.3 | ADR format — context, decision, consequences | практика | — |
| 6.4.4 | Inline code comments — when, not what | **глубоко** | — |
| 6.4.5 | Commit messages — Conventional Commits | практика | — |
| 6.4.6 | Changelog — keep a CHANGELOG.md | практика | — |
| 6.4.7 | Onboarding doc — help new dev start in 1 day | практика | — |
| 6.4.8 | Runbook — how to handle common production issues | понимание | — |

### Узел 6.5 — Agile & Teamwork
**ID:** `06-agile` | **Статус:** 🔲
> **Материалы:** 📚 0/8 · — 8

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 6.5.1 | Scrum basics — sprint, backlog, daily standup | понимание | — |
| 6.5.2 | User story format — As a... I want... So that... | практика | — |
| 6.5.3 | Story points vs hours — relative estimation | понимание | — |
| 6.5.4 | Breaking down tasks — vertical slices | **глубоко** | — |
| 6.5.5 | Definition of Done — tests, review, docs | **глубоко** | — |
| 6.5.6 | Retrospective — what went well, improve | понимание | — |
| 6.5.7 | Communicating blockers — early and clearly | **глубоко** | — |
| 6.5.8 | Pair programming — driver/navigator | понимание | — |

---

## Фаза 7: Performance & Scale (углубление)

### Узел 7.1 — Advanced caching strategies
**ID:** `07-caching-advanced` | **Статус:** 🔲
> **Материалы:** 📚 0/8 · — 8

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 7.1.1 | Multi-level cache — memory + Redis + CDN | **глубоко** | — |
| 7.1.2 | Write-through vs write-behind vs write-around | **глубоко** | — |
| 7.1.3 | Cache warming — preload on startup | понимание | — |
| 7.1.4 | HTTP caching — ETag, Cache-Control, 304 | **глубоко** | — |
| 7.1.5 | Stale-while-revalidate pattern | **глубоко** | — |
| 7.1.6 | React Query as client-side cache layer | **глубоко** | — |
| 7.1.7 | CDN cache invalidation | понимание | — |
| 7.1.8 | Cache metrics — hit rate, miss rate | **глубоко** | — |

### Узел 7.2 — Load & Stress testing
**ID:** `07-load-testing` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 7.2.1 | Load test goals — find breaking point, baseline | **глубоко** | — |
| 7.2.2 | k6 or bombardier — simple HTTP load test | практика | — |
| 7.2.3 | Metrics: RPS, p50/p95/p99 latency, error rate | **глубоко** | — |
| 7.2.4 | Identify bottleneck from results — CPU, DB, network | **глубоко** | — |
| 7.2.5 | Stress test — beyond capacity, recovery behavior | понимание | — |
| 7.2.6 | Soak test — memory leaks over time | понимание | — |
| 7.2.7 | Load test in CI — regression detection (concept) | понимание | — |

### Узел 7.3 — Frontend at scale
**ID:** `07-frontend-scale` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 7.3.1 | Core Web Vitals — LCP, FID/INP, CLS | **глубоко** | — |
| 7.3.2 | Critical CSS, font loading strategy | понимание | — |
| 7.3.3 | Service Worker — offline cache (PWA basics) | понимание | — |
| 7.3.4 | SSR vs CSR vs SSG — trade-offs (Next.js concept) | **глубоко** | — |
| 7.3.5 | Micro-frontends (concept) — team autonomy | понимание | — |
| 7.3.6 | Monorepo tools — Turborepo, Nx (concept) | понимание | — |
| 7.3.7 | Shared component library — versioning | понимание | — |

---

## Фаза 8: Middle+ Horizon (расширение)

### Узел 8.1 — Kubernetes (intro)
**ID:** `08-kubernetes` | **Статус:** 🔲
> **Материалы:** 📚 0/6 · — 6

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 8.1.1 | Why K8s — orchestration at scale | понимание | — |
| 8.1.2 | Pod, Deployment, Service, Ingress | понимание | — |
| 8.1.3 | kubectl basics — apply, get, logs, describe | практика | — |
| 8.1.4 | ConfigMap, Secret — configuration | понимание | — |
| 8.1.5 | Horizontal Pod Autoscaler (concept) | понимание | — |
| 8.1.6 | Docker Compose vs K8s — when which | **глубоко** | — |

### Узел 8.2 — Event Sourcing & CQRS advanced
**ID:** `08-event-sourcing` | **Статус:** 🔲
> **Материалы:** 📚 0/5 · — 5

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 8.2.1 | Event store vs state store | **глубоко** | — |
| 8.2.2 | Event replay — rebuild state from events | **глубоко** | — |
| 8.2.3 | Snapshots — optimize replay | понимание | — |
| 8.2.4 | Projections — read model from events | **глубоко** | — |
| 8.2.5 | When Event Sourcing justified | **глубоко** | — |

### Узел 8.3 — Multi-tenancy
**ID:** `08-multi-tenancy` | **Статус:** 🔲
> **Материалы:** 📚 0/5 · — 5

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 8.3.1 | Shared DB + tenant_id vs DB per tenant | **глубоко** | — |
| 8.3.2 | Global query filter for tenant isolation | **глубоко** | — |
| 8.3.3 | Tenant resolution — subdomain, header, claim | **глубоко** | — |
| 8.3.4 | Data isolation security — prevent cross-tenant leak | **глубоко** | — |
| 8.3.5 | Billing per tenant (concept) | понимание | — |

### Узел 8.4 — GraphQL (intro)
**ID:** `08-graphql` | **Статус:** 🔲
> **Материалы:** 📚 0/5 · — 5

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 8.4.1 | GraphQL vs REST — over/under fetching | **глубоко** | — |
| 8.4.2 | Schema, Query, Mutation, Subscription | понимание | — |
| 8.4.3 | Hot Chocolate in .NET (overview) | понимание | — |
| 8.4.4 | N+1 in GraphQL — DataLoader pattern | **глубоко** | — |
| 8.4.5 | When GraphQL vs REST | **глубоко** | — |

### Узел 8.5 — Feature Flags & A/B testing
**ID:** `08-feature-flags` | **Статус:** 🔲
> **Материалы:** 📚 0/4 · — 4

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 8.5.1 | Feature flags — gradual rollout, kill switch | **глубоко** | — |
| 8.5.2 | LaunchDarkly / custom implementation | понимание | — |
| 8.5.3 | Trunk-based development connection | понимание | — |
| 8.5.4 | A/B testing basics — metrics, statistical significance | понимание | — |

---

## Фаза 9: Capstone (Финальный проект)

### Узел 9.1 — Graduation Project
**ID:** `09-capstone` | **Статус:** 🔲
> **Материалы:** 📚 0/0

> Полноценное приложение, демонстрирующее Middle-уровень. Строится **совместно с AI**, не copy-paste.

**Обязательные требования:**

- [ ] Clean Architecture (Domain, Application, Infrastructure, API)
- [ ] PostgreSQL + EF Core (migrations, optimized queries, indexes)
- [ ] ADO.NET/raw SQL для хотя бы одного отчёта
- [ ] ASP.NET Core Web API (REST, ProblemDetails, Swagger)
- [ ] React + TypeScript (React Query, React Router, forms + Zod)
- [ ] JWT Auth (access + refresh tokens, protected routes)
- [ ] CRUD для 3+ связанных сущностей
- [ ] Pagination, filtering, sorting (backend + frontend)
- [ ] Unit tests (services, validators) + Integration tests (API)
- [ ] Frontend tests (RTL) + 2+ E2E scenarios (Playwright)
- [ ] Docker Compose (api + frontend + postgres + redis)
- [ ] CI pipeline (build + test on push)
- [ ] Structured logging + Correlation ID
- [ ] Health checks
- [ ] SignalR real-time feature (notifications/chat)
- [ ] Background job (email, cleanup, report)
- [ ] README + C4 Context/Container diagram
- [ ] ADR для 2+ архитектурных решений

**Критерии оценки (Middle checklist):**

| Критерий | Вес |
|---|---|
| Architecture — слои, dependency rule | 20% |
| Code quality — SOLID, readable, no God classes | 15% |
| API design — RESTful, errors, validation | 15% |
| Database — schema, indexes, no N+1 | 15% |
| Frontend — UX, loading states, error handling | 15% |
| Testing — meaningful coverage, not trivial | 10% |
| DevOps — Docker, CI, deployable | 10% |

**Идеи проектов:**

1. **Task Management** (Trello-like) — boards, lists, cards, drag-drop, real-time
2. **E-commerce** — products, cart, orders, payment mock, admin panel
3. **Blog Platform** — posts, comments, tags, notifications, markdown editor
4. **Booking System** — services, calendar, appointments, reminders
5. **LMS** — courses, lessons, progress tracking, quizzes
6. **Inventory Management** — warehouses, products, movements, reports

### Узел 9.2 — Interview Preparation
**ID:** `09-interview-prep` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 9.2.1 | Resume — projects with measurable impact | практика | — |
| 9.2.2 | Explain your capstone — architecture decisions | **глубоко** | — |
| 9.2.3 | 50 common C#/.NET interview questions | практика | — |
| 9.2.4 | 30 React/TypeScript interview questions | практика | — |
| 9.2.5 | 20 SQL interview questions | практика | — |
| 9.2.6 | System design mock interview — 3 scenarios | практика | — |
| 9.2.7 | Live coding — 10 LeetCode Medium tasks | практика | — |
| 9.2.8 | Behavioral questions — STAR method | практика | — |
| 9.2.9 | Portfolio — GitHub README, demo deploy | практика | — |
| 9.2.10 | Mock interview with AI — full cycle | практика | — |

---

# MIDDLE+ TRACK

> **Prerequisite:** Фазы 0–6 пройдены; **Capstone 1 (9.1)** завершён или в финальной стадии.  
> **Цель:** production-ready навыки, system design, cloud, distributed systems, leadership.

---

## Фаза 10: Cloud & Production Deploy

> **Primary cloud:** Microsoft Azure (стек .NET). AWS — альтернативный трек в скобках где уместно.

### Узел 10.1 — Azure fundamentals
**ID:** `10-azure-fundamentals` | **Статус:** 🔲
> **Материалы:** 📚 0/12 · — 12

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 10.1.1 | Cloud models: IaaS, PaaS, SaaS — что выбирать | **глубоко** | — |
| 10.1.2 | Azure regions, availability zones, paired regions | **глубоко** | — |
| 10.1.3 | Resource groups, subscriptions, management hierarchy | понимание | — |
| 10.1.4 | Azure Portal vs Azure CLI vs ARM | практика | — |
| 10.1.5 | App Service — deploy ASP.NET Core Web API | **глубоко** | — |
| 10.1.6 | Azure Container Apps / ACI — container hosting options | **глубоко** | — |
| 10.1.7 | Static Web Apps — React frontend hosting | практика | — |
| 10.1.8 | Azure DNS + custom domain | практика | — |
| 10.1.9 | Managed Identity — passwordless access to Azure resources | **глубоко** | — |
| 10.1.10 | Azure pricing calculator — estimate monthly cost | практика | — |
| 10.1.11 | Free tier vs production tier — trade-offs | понимание | — |
| 10.1.12 | AWS equivalent map (ECS, RDS, S3) — awareness | понимание | — |

### Узел 10.2 — Managed PostgreSQL & data in cloud
**ID:** `10-azure-database` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 10.2.1 | Azure Database for PostgreSQL Flexible Server | **глубоко** | — |
| 10.2.2 | Connection strings, SSL mode, firewall rules | **глубоко** | — |
| 10.2.3 | Private endpoint — DB not on public internet | **глубоко** | — |
| 10.2.4 | Run EF Core migrations against cloud DB safely | **глубоко** | — |
| 10.2.5 | Backup retention, point-in-time restore — drill | **глубоко** | — |
| 10.2.6 | Read replica (concept) — offload read traffic | понимание | — |
| 10.2.7 | Connection pooling with cloud PG — PgBouncer / Npgsql | **глубоко** | — |
| 10.2.8 | Secrets: never commit connection string — Key Vault ref | **глубоко** | — |
| 10.2.9 | Local dev vs cloud DB — when Docker PG is enough | понимание | — |
| 10.2.10 | Data migration: pg_dump → Azure PG | практика | — |

### Узел 10.3 — Blob Storage, CDN & files
**ID:** `10-azure-storage` | **Статус:** 🔲
> **Материалы:** 📚 0/8 · — 8

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 10.3.1 | Azure Blob Storage — containers, blobs, tiers (Hot/Cool) | **глубоко** | — |
| 10.3.2 | Upload/download from ASP.NET Core (Azure.Storage.Blobs) | практика | — |
| 10.3.3 | SAS tokens — temporary secure access | **глубоко** | — |
| 10.3.4 | Azure CDN / Front Door — static assets, cache rules | **глубоко** | — |
| 10.3.5 | Replace local file storage in capstone with Blob | практика | — |
| 10.3.6 | CORS for blob + SPA | практика | — |
| 10.3.7 | Lifecycle policies — auto-archive old files | понимание | — |
| 10.3.8 | S3 equivalent (AWS awareness) | понимание | — |

### Узел 10.4 — Secrets & configuration in cloud
**ID:** `10-azure-secrets` | **Статус:** 🔲
> **Материалы:** 📚 0/8 · — 8

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 10.4.1 | Azure Key Vault — secrets, keys, certificates | **глубоко** | — |
| 10.4.2 | App Service + Key Vault reference (@Microsoft.KeyVault) | **глубоко** | — |
| 10.4.3 | ASP.NET Core config provider for Key Vault | практика | — |
| 10.4.4 | App Configuration — feature flags in cloud | **глубоко** | — |
| 10.4.5 | Environment-specific settings: dev/staging/prod | **глубоко** | — |
| 10.4.6 | Rotation strategy — JWT signing key, DB password | **глубоко** | — |
| 10.4.7 | CI/CD secrets — GitHub Actions → Azure OIDC (no long-lived keys) | **глубоко** | — |
| 10.4.8 | Audit: who accessed which secret | понимание | — |

### Узел 10.5 — Deploy Capstone 1 to Azure
**ID:** `10-cloud-deploy-capstone` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 10.5.1 | Architecture diagram: SWA + App Service + PG + Redis + Blob | **глубоко** | — |
| 10.5.2 | Deploy API to App Service from GitHub Actions | практика | — |
| 10.5.3 | Deploy React to Static Web Apps / Blob+CDN | практика | — |
| 10.5.4 | Azure Cache for Redis — replace local Redis | практика | — |
| 10.5.5 | Environment variables per slot (staging/production) | **глубоко** | — |
| 10.5.6 | Custom domain + managed certificate (HTTPS) | практика | — |
| 10.5.7 | Smoke test production URL — health, auth, CRUD | практика | — |
| 10.5.8 | Rollback strategy — deployment slots | **глубоко** | — |
| 10.5.9 | Cost review after deploy — optimize SKUs | практика | — |
| 10.5.10 | Runbook: «how to redeploy from scratch» | практика | — |

### Узел 10.6 — Infrastructure as Code (IaC)
**ID:** `10-iac` | **Статус:** 🔲
> **Материалы:** 📚 0/8 · — 8

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 10.6.1 | Why IaC — reproducible environments | **глубоко** | — |
| 10.6.2 | ARM templates vs Bicep vs Terraform — trade-offs | **глубоко** | — |
| 10.6.3 | Bicep basics — resource declaration, parameters, outputs | практика | — |
| 10.6.4 | Deploy RG + App Service + PG via Bicep | практика | — |
| 10.6.5 | Terraform intro — provider, state, plan/apply | понимание | — |
| 10.6.6 | IaC in CI — validate on PR, deploy on merge | **глубоко** | — |
| 10.6.7 | Drift detection — manual changes vs code | понимание | — |
| 10.6.8 | Modules — reuse infrastructure patterns | понимание | — |

### Узел 10.7 — Cloud networking & security
**ID:** `10-cloud-networking` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 10.7.1 | VNet, subnets, NSG — network isolation | **глубоко** | — |
| 10.7.2 | Private endpoints for PG, Key Vault, Storage | **глубоко** | — |
| 10.7.3 | App Service VNet integration | понимание | — |
| 10.7.4 | WAF (Web Application Firewall) — concept | понимание | — |
| 10.7.5 | DDoS protection basics | понимание | — |
| 10.7.6 | Zero Trust mindset — least privilege everywhere | **глубоко** | — |
| 10.7.7 | Diagnostic: API can't reach DB — troubleshooting checklist | **глубоко** | — |

### Узел 10.8 — Reliability, SLA & disaster recovery
**ID:** `10-cloud-reliability` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 10.8.1 | SLA, SLO, SLI — definitions and examples | **глубоко** | — |
| 10.8.2 | Availability zones — multi-AZ deploy | **глубоко** | — |
| 10.8.3 | RTO, RPO — backup/restore objectives | **глубоко** | — |
| 10.8.4 | Backup drill — restore PG to new server | практика | — |
| 10.8.5 | Geo-redundancy (concept) — when worth the cost | понимание | — |
| 10.8.6 | Chaos mindset — what if Redis disappears? | **глубоко** | — |
| 10.8.7 | Status page communication during outage | понимание | — |

## Фаза 11: Kubernetes (Hands-on)

> **Prerequisite:** Фаза 10.5 (cloud deploy experience). Локальный кластер: Docker Desktop K8s / minikube / k3d.

### Узел 11.1 — Kubernetes architecture (deep)
**ID:** `11-k8s-architecture` | **Статус:** 🔲
> **Материалы:** 📚 0/9 · — 9

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 11.1.1 | Control plane vs worker nodes — components map | **глубоко** | — |
| 11.1.2 | etcd — cluster state store | **глубоко** | — |
| 11.1.3 | kube-apiserver, scheduler, controller-manager | **глубоко** | — |
| 11.1.4 | kubelet, kube-proxy on worker | **глубоко** | — |
| 11.1.5 | Desired state reconciliation — declarative model | **глубоко** | — |
| 11.1.6 | kubectl → API server → etcd flow | **глубоко** | — |
| 11.1.7 | Namespace — logical isolation | практика | — |
| 11.1.8 | Labels and selectors — how K8s groups resources | **глубоко** | — |
| 11.1.9 | K8s vs Docker Compose vs App Service — decision matrix | **глубоко** | — |

### Узел 11.2 — Workloads: Pod, Deployment, ReplicaSet
**ID:** `11-k8s-workloads` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 11.2.1 | Pod — smallest deployable unit, multi-container | **глубоко** | — |
| 11.2.2 | Pod lifecycle: Pending → Running → Succeeded/Failed | **глубоко** | — |
| 11.2.3 | Deployment — declarative rolling updates | **глубоко** | — |
| 11.2.4 | ReplicaSet — maintain N replicas | понимание | — |
| 11.2.5 | Write Deployment YAML for ASP.NET Core API | практика | — |
| 11.2.6 | Resource requests and limits — CPU, memory | **глубоко** | — |
| 11.2.7 | Rolling update vs recreate strategy | **глубоко** | — |
| 11.2.8 | Rollback: kubectl rollout undo | практика | — |
| 11.2.9 | Init containers — migration before app start | **глубоко** | — |
| 11.2.10 | Sidecar pattern (concept) — logging, proxy | понимание | — |

### Узел 11.3 — Networking: Service, Ingress
**ID:** `11-k8s-networking` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 11.3.1 | ClusterIP, NodePort, LoadBalancer — Service types | **глубоко** | — |
| 11.3.2 | DNS inside cluster — service-name.namespace | **глубоко** | — |
| 11.3.3 | Ingress controller — NGINX Ingress | **глубоко** | — |
| 11.3.4 | Ingress rules — path routing /api → api-svc | практика | — |
| 11.3.5 | TLS termination on Ingress — cert-manager | практика | — |
| 11.3.6 | NetworkPolicy (concept) — restrict pod traffic | понимание | — |
| 11.3.7 | Debug: Service has no endpoints | **глубоко** | — |

### Узел 11.4 — Configuration: ConfigMap, Secret
**ID:** `11-k8s-config` | **Статус:** 🔲
> **Материалы:** 📚 0/6 · — 6

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 11.4.1 | ConfigMap — non-sensitive config as env/volume | **глубоко** | — |
| 11.4.2 | Secret — base64 is NOT encryption — sealed secrets | **глубоко** | — |
| 11.4.3 | Mount connection string from Secret to API pod | практика | — |
| 11.4.4 | External Secrets Operator + Key Vault (concept) | понимание | — |
| 11.4.5 | Config hot-reload vs pod restart | понимание | — |
| 11.4.6 | appsettings.json vs env vars in containers | **глубоко** | — |

### Узел 11.5 — Health probes & graceful shutdown
**ID:** `11-k8s-probes` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 11.5.1 | Liveness probe — restart unhealthy pod | **глубоко** | — |
| 11.5.2 | Readiness probe — remove from Service endpoints | **глубоко** | — |
| 11.5.3 | Startup probe — slow-starting .NET app | **глубоко** | — |
| 11.5.4 | Map to ASP.NET Core /health/live and /health/ready | практика | — |
| 11.5.5 | Graceful shutdown — SIGTERM, IHostApplicationLifetime | **глубоко** | — |
| 11.5.6 | terminationGracePeriodSeconds | **глубоко** | — |
| 11.5.7 | PreStop hook — drain connections | понимание | — |

### Узел 11.6 — kubectl troubleshooting
**ID:** `11-k8s-troubleshooting` | **Статус:** 🔲
> **Материалы:** 📚 0/8 · — 8

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 11.6.1 | kubectl get/describe/logs/events — workflow | **глубоко** | — |
| 11.6.2 | CrashLoopBackOff — diagnose | **глубоко** | — |
| 11.6.3 | OOMKilled — memory limits | **глубоко** | — |
| 11.6.4 | ImagePullBackOff — registry auth | **глубоко** | — |
| 11.6.5 | kubectl exec -it — shell into pod | практика | — |
| 11.6.6 | kubectl port-forward — local debug | практика | — |
| 11.6.7 | Stern / k9s (optional tools) | понимание | — |
| 11.6.8 | Practice: break 5 things, fix each | практика | — |

### Узел 11.7 — Helm & package management
**ID:** `11-helm` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 11.7.1 | Why Helm — templated K8s manifests | **глубоко** | — |
| 11.7.2 | Chart structure: Chart.yaml, values.yaml, templates/ | **глубоко** | — |
| 11.7.3 | helm install/upgrade/rollback | практика | — |
| 11.7.4 | Values per environment: dev/staging/prod | практика | — |
| 11.7.5 | Helm hook — pre-install migration job | понимание | — |
| 11.7.6 | Kustomize overlay alternative — when which | понимание | — |
| 11.7.7 | Package capstone API chart | практика | — |

### Узел 11.8 — Deploy full stack to Kubernetes
**ID:** `11-k8s-full-deploy` | **Статус:** 🔲
> **Материалы:** 📚 0/8 · — 8

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 11.8.1 | Architecture: Ingress → API + SPA + PG + Redis | **глубоко** | — |
| 11.8.2 | StatefulSet vs managed PG outside cluster | **глубоко** | — |
| 11.8.3 | Deploy PostgreSQL in K8s (dev only) vs Azure PG (prod) | **глубоко** | — |
| 11.8.4 | Redis Deployment for cache/SignalR backplane | практика | — |
| 11.8.5 | Frontend: nginx container serving React build | практика | — |
| 11.8.6 | CI: build image → push ACR → helm upgrade | **глубоко** | — |
| 11.8.7 | Azure Kubernetes Service (AKS) — create cluster | практика | — |
| 11.8.8 | End-to-end smoke test on K8s | практика | — |

### Узел 11.9 — Autoscaling & production K8s
**ID:** `11-k8s-autoscale` | **Статус:** 🔲
> **Материалы:** 📚 0/6 · — 6

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 11.9.1 | Horizontal Pod Autoscaler — CPU/memory metrics | **глубоко** | — |
| 11.9.2 | Cluster Autoscaler (concept) | понимание | — |
| 11.9.3 | Pod Disruption Budget — safe node drain | **глубоко** | — |
| 11.9.4 | Resource quotas per namespace | понимание | — |
| 11.9.5 | AKS production checklist | **глубоко** | — |
| 11.9.6 | When NOT to use K8s — honest trade-off | **глубоко** | — |

## Фаза 12: System Design (Deep)

> **Prerequisite:** Фазы 4, 6.3, 9.1. **Формат каждой задачи:** requirements → API → schema → diagram → bottlenecks → scale.

### Узел 12.1 — Методология system design
**ID:** `12-sd-methodology` | **Статус:** 🔲
> **Материалы:** 📚 0/12 · — 12

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 12.1.1 | Functional vs non-functional requirements | **глубоко** | — |
| 12.1.2 | Back-of-envelope: QPS, storage, bandwidth | **глубоко** | — |
| 12.1.3 | API design first — REST resources, auth | **глубоко** | — |
| 12.1.4 | Data model — entities, indexes, sharding candidates | **глубоко** | — |
| 12.1.5 | High-level diagram — C4 Container level | **глубоко** | — |
| 12.1.6 | Sequence diagram — critical flows | **глубоко** | — |
| 12.1.7 | Identify bottlenecks — DB, cache, single server | **глубоко** | — |
| 12.1.8 | Scale reads vs scale writes — different tactics | **глубоко** | — |
| 12.1.9 | CAP trade-off in your design | **глубоко** | — |
| 12.1.10 | Document with ADR — Architecture Decision Record | практика | — |
| 12.1.11 | 45-minute mock interview structure | **глубоко** | — |
| 12.1.12 | Common mistakes — jumping to Kafka too early | **глубоко** | — |

### Узел 12.2 — Design: URL Shortener
**ID:** `12-sd-url-shortener` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 12.2.1 | Requirements: shorten, redirect, analytics, TTL | **глубоко** | — |
| 12.2.2 | Base62 encoding vs hash collision handling | **глубоко** | — |
| 12.2.3 | Read-heavy — cache redirect mapping in Redis | **глубоко** | — |
| 12.2.4 | DB schema: short_code PK, long_url, user_id, clicks | практика | — |
| 12.2.5 | 301 vs 302 redirect — analytics implications | **глубоко** | — |
| 12.2.6 | Scale: 100M URLs, 10K RPS read — estimate storage | **глубоко** | — |
| 12.2.7 | Write full design doc + diagram | практика | — |

### Узел 12.3 — Design: Booking / Calendar System
**ID:** `12-sd-booking` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 12.3.1 | Requirements: services, slots, double-booking prevention | **глубоко** | — |
| 12.3.2 | Concurrency: SELECT FOR UPDATE vs optimistic concurrency | **глубоко** | — |
| 12.3.3 | Timezone handling — store UTC, display local | **глубоко** | — |
| 12.3.4 | Notification pipeline — email/SMS async | **глубоко** | — |
| 12.3.5 | Calendar UI vs API contract | практика | — |
| 12.3.6 | Scale: peak booking hours — queue writes | **глубоко** | — |
| 12.3.7 | Write full design doc | практика | — |

### Узел 12.4 — Design: Real-time Chat
**ID:** `12-sd-chat` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 12.4.1 | Requirements: 1:1, groups, online status, history | **глубоко** | — |
| 12.4.2 | WebSocket vs polling — SignalR architecture | **глубоко** | — |
| 12.4.3 | Message storage — PostgreSQL vs Cassandra (concept) | **глубоко** | — |
| 12.4.4 | Redis pub/sub for cross-server delivery | **глубоко** | — |
| 12.4.5 | Presence — heartbeat, last seen | **глубоко** | — |
| 12.4.6 | Scale: 50K concurrent connections — sticky sessions? | **глубоко** | — |
| 12.4.7 | Write full design doc | практика | — |

### Узел 12.5 — Design: Notification System
**ID:** `12-sd-notifications` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 12.5.1 | Channels: in-app, email, push, SMS | **глубоко** | — |
| 12.5.2 | Fan-out on write vs fan-out on read | **глубоко** | — |
| 12.5.3 | Template engine, user preferences, unsubscribe | **глубоко** | — |
| 12.5.4 | Queue-based delivery — retry, DLQ | **глубоко** | — |
| 12.5.5 | Idempotency — don't send duplicate emails | **глубоко** | — |
| 12.5.6 | Rate limit per user — anti-spam | **глубоко** | — |
| 12.5.7 | Write full design doc | практика | — |

### Узел 12.6 — Design: News Feed / Activity Stream
**ID:** `12-sd-feed` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 12.6.1 | Pull vs push model for feed | **глубоко** | — |
| 12.6.2 | Fan-out on write — celebrity problem | **глубоко** | — |
| 12.6.3 | Hybrid fan-out strategy | **глубоко** | — |
| 12.6.4 | Cursor pagination for infinite scroll | **глубоко** | — |
| 12.6.5 | Ranking algorithm (basics) — time decay | понимание | — |
| 12.6.6 | Cache hot feeds in Redis | **глубоко** | — |
| 12.6.7 | Write full design doc | практика | — |

### Узел 12.7 — Design: E-commerce Order Flow
**ID:** `12-sd-ecommerce` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 12.7.1 | Cart, inventory, order, payment — bounded contexts | **глубоко** | — |
| 12.7.2 | Inventory reservation — avoid oversell | **глубоко** | — |
| 12.7.3 | Saga: payment failed → release inventory | **глубоко** | — |
| 12.7.4 | Idempotent order creation | **глубоко** | — |
| 12.7.5 | Event: OrderPlaced → warehouse, email, analytics | **глубоко** | — |
| 12.7.6 | Read model for order history | **глубоко** | — |
| 12.7.7 | Write full design doc | практика | — |

### Узел 12.8 — Design: File Upload & Storage
**ID:** `12-sd-file-upload` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 12.8.1 | Direct upload vs presigned URL to Blob/S3 | **глубоко** | — |
| 12.8.2 | Chunked upload for large files | **глубоко** | — |
| 12.8.3 | Virus scan pipeline (concept) | понимание | — |
| 12.8.4 | CDN delivery, image resizing (concept) | **глубоко** | — |
| 12.8.5 | Metadata in PG, binary in object storage | **глубоко** | — |
| 12.8.6 | Quota per user, access control | **глубоко** | — |
| 12.8.7 | Write full design doc | практика | — |

### Узел 12.9 — Design: Rate Limiter
**ID:** `12-sd-rate-limiter` | **Статус:** 🔲
> **Материалы:** 📚 0/6 · — 6

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 12.9.1 | Token bucket vs sliding window vs fixed window | **глубоко** | — |
| 12.9.2 | Redis-based distributed rate limit | **глубоко** | — |
| 12.9.3 | Per-user vs per-IP vs per-API-key | **глубоко** | — |
| 12.9.4 | Response headers: Retry-After, X-RateLimit-* | **глубоко** | — |
| 12.9.5 | Middleware implementation sketch in ASP.NET | практика | — |
| 12.9.6 | Write full design doc | практика | — |

### Узел 12.10 — Design: Search System
**ID:** `12-sd-search` | **Статус:** 🔲
> **Материалы:** 📚 0/6 · — 6

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 12.10.1 | PostgreSQL full-text vs Elasticsearch | **глубоко** | — |
| 12.10.2 | Indexing pipeline — sync vs async | **глубоко** | — |
| 12.10.3 | Autocomplete — prefix queries, trie (concept) | **глубоко** | — |
| 12.10.4 | Faceted search — filters, aggregations | **глубоко** | — |
| 12.10.5 | Relevance tuning — rank, boost | понимание | — |
| 12.10.6 | Write full design doc | практика | — |

### Узел 12.11 — Design: Multi-tenant SaaS
**ID:** `12-sd-multi-tenant` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 12.11.1 | Tenant isolation models — shared DB, schema, DB per tenant | **глубоко** | — |
| 12.11.2 | tenant_id everywhere + global query filter | **глубоко** | — |
| 12.11.3 | Subdomain routing — tenant resolution middleware | **глубоко** | — |
| 12.11.4 | Noisy neighbor — fair resource limits | **глубоко** | — |
| 12.11.5 | Cross-tenant leak — test scenarios | **глубоко** | — |
| 12.11.6 | Billing meter per tenant (concept) | понимание | — |
| 12.11.7 | Write full design doc | практика | — |

### Узел 12.12 — ADR & design portfolio
**ID:** `12-sd-portfolio` | **Статус:** 🔲
> **Материалы:** 📚 0/5 · — 5

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 12.12.1 | Write 5+ ADRs for capstone decisions | практика | — |
| 12.12.2 | GitHub repo `/docs/design/` — all 10 designs | практика | — |
| 12.12.3 | Peer review: AI/mock interview on 3 designs | практика | — |
| 12.12.4 | Refine weakest design after feedback | практика | — |
| 12.12.5 | Present one design in 15 min (record video optional) | практика | — |

## Фаза 13: Distributed Systems & Advanced Architecture

> **Prerequisite:** Фазы 4.4, 5.7, 9.1. **Цель:** реализовать patterns, не только читать про них.

### Узел 13.1 — Outbox & Inbox patterns
**ID:** `13-outbox-inbox` | **Статус:** 🔲
> **Материалы:** 📚 0/8 · — 8

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 13.1.1 | Dual write problem — DB + broker inconsistency | **глубоко** | — |
| 13.1.2 | Transactional Outbox — same DB transaction | **глубоко** | — |
| 13.1.3 | Outbox table schema — id, payload, processed_at | **глубоко** | — |
| 13.1.4 | Background worker polls outbox → publish to queue | **глубоко** | — |
| 13.1.5 | Inbox pattern — idempotent consumer | **глубоко** | — |
| 13.1.6 | Implement Outbox in capstone with PostgreSQL | практика | — |
| 13.1.7 | Debezium CDC alternative (concept) | понимание | — |
| 13.1.8 | Testing outbox — integration test | практика | — |

### Узел 13.2 — Saga patterns
**ID:** `13-saga` | **Статус:** 🔲
> **Материалы:** 📚 0/8 · — 8

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 13.2.1 | Distributed transaction problem — no 2PC in microservices | **глубоко** | — |
| 13.2.2 | Choreography saga — events only | **глубоко** | — |
| 13.2.3 | Orchestration saga — central coordinator | **глубоко** | — |
| 13.2.4 | Compensating transactions — undo steps | **глубоко** | — |
| 13.2.5 | Order saga: reserve → pay → ship → compensate | **глубоко** | — |
| 13.2.6 | MassTransit saga state machine | практика | — |
| 13.2.7 | Saga vs single monolith transaction — trade-offs | **глубоко** | — |
| 13.2.8 | Implement mini-saga in lab project | практика | — |

### Узел 13.3 — Idempotency & message reliability
**ID:** `13-idempotency` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 13.3.1 | At-least-once delivery — duplicates inevitable | **глубоко** | — |
| 13.3.2 | Idempotency key header on API | **глубоко** | — |
| 13.3.3 | Idempotency store — key + response cache | **глубоко** | — |
| 13.3.4 | Consumer deduplication table — message_id | **глубоко** | — |
| 13.3.5 | Exactly-once illusion — design for it | **глубоко** | — |
| 13.3.6 | Retry with exponential backoff + jitter | **глубоко** | — |
| 13.3.7 | Implement idempotent POST endpoint | практика | — |

### Узел 13.4 — Eventual consistency & CQRS deep
**ID:** `13-eventual-consistency` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 13.4.1 | Strong vs eventual consistency — user-visible examples | **глубоко** | — |
| 13.4.2 | Read-your-writes — session stickiness or routing | **глубоко** | — |
| 13.4.3 | CQRS read model — separate optimized tables | **глубоко** | — |
| 13.4.4 | Projections — rebuild read model from events | **глубоко** | — |
| 13.4.5 | UI patterns for stale data — loading, refresh | **глубоко** | — |
| 13.4.6 | CAP in practice — partition tolerance is mandatory | **глубоко** | — |
| 13.4.7 | Version vectors / timestamps for conflict (concept) | понимание | — |

### Узел 13.5 — Dead letter queues & monitoring messages
**ID:** `13-dlq` | **Статус:** 🔲
> **Материалы:** 📚 0/6 · — 6

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 13.5.1 | Poison message — always fails processing | **глубоко** | — |
| 13.5.2 | DLQ configuration — max retries then DLQ | **глубоко** | — |
| 13.5.3 | DLQ monitoring dashboard — alert on depth | **глубоко** | — |
| 13.5.4 | Replay from DLQ — fix and reprocess | **глубоко** | — |
| 13.5.5 | MassTransit error queues | практика | — |
| 13.5.6 | Runbook: DLQ growing — investigation steps | практика | — |

### Узел 13.6 — Modular Monolith
**ID:** `13-modular-monolith` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 13.6.1 | Modular monolith definition — one deploy, clear modules | **глубоко** | — |
| 13.6.2 | Vertical slices per feature module | **глубоко** | — |
| 13.6.3 | Module boundaries — no cross-module EF navigation | **глубоко** | — |
| 13.6.4 | Internal events vs public API between modules | **глубоко** | — |
| 13.6.5 | Refactor capstone toward modular monolith | практика | — |
| 13.6.6 | When to extract module to microservice | **глубоко** | — |
| 13.6.7 | Strangler fig — gradual extraction | **глубоко** | — |

### Узел 13.7 — Microservices lab (2–3 services)
**ID:** `13-microservices-lab` | **Статус:** 🔲
> **Материалы:** 📚 0/9 · — 9

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 13.7.1 | Split: Identity, Catalog, Orders — bounded contexts | **глубоко** | — |
| 13.7.2 | Database per service — no shared tables | **глубоко** | — |
| 13.7.3 | Sync communication — HTTP + Polly resilience | **глубоко** | — |
| 13.7.4 | Async — OrderPlaced event → notification service | **глубоко** | — |
| 13.7.5 | Distributed tracing across services — mandatory | **глубоко** | — |
| 13.7.6 | docker-compose for 3 services + PG + RabbitMQ | практика | — |
| 13.7.7 | Contract testing between services (concept) | понимание | — |
| 13.7.8 | Debug: which service failed? — trace ID | **глубоко** | — |
| 13.7.9 | Document: why 3 services, not 30 | **глубоко** | — |

### Узел 13.8 — API Gateway (YARP)
**ID:** `13-yarp-gateway` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 13.8.1 | Why API Gateway — single entry, cross-cutting concerns | **глубоко** | — |
| 13.8.2 | YARP setup — reverse proxy to backend services | практика | — |
| 13.8.3 | Route /api/orders → Orders service | практика | — |
| 13.8.4 | JWT validation at gateway vs per-service | **глубоко** | — |
| 13.8.5 | Rate limiting at gateway | практика | — |
| 13.8.6 | BFF pattern — gateway tailored for SPA | **глубоко** | — |
| 13.8.7 | Gateway vs direct service call — latency cost | **глубоко** | — |

### Узел 13.9 — Event Sourcing lab
**ID:** `13-event-sourcing-lab` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 13.9.1 | Event store table — stream_id, version, payload | **глубоко** | — |
| 13.9.2 | Aggregate rebuild from events — BankAccount example | **глубоко** | — |
| 13.9.3 | Optimistic concurrency — expected version | **глубоко** | — |
| 13.9.4 | Snapshots every N events — performance | **глубоко** | — |
| 13.9.5 | Projection worker — AccountBalanceReadModel | **глубоко** | — |
| 13.9.6 | When Event Sourcing is overkill | **глубоко** | — |
| 13.9.7 | Implement one aggregate with ES | практика | — |

### Узел 13.10 — Kafka & event streaming (concept + optional lab)
**ID:** `13-kafka` | **Статус:** 🔲
> **Материалы:** 📚 0/5 · — 5

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 13.10.1 | Kafka vs RabbitMQ — log vs queue mental model | **глубоко** | — |
| 13.10.2 | Topics, partitions, consumer groups | **глубоко** | — |
| 13.10.3 | Event streaming use cases — audit, analytics, CDC | **глубоко** | — |
| 13.10.4 | When to adopt Kafka — high volume, replay | **глубоко** | — |
| 13.10.5 | (Optional) Local Kafka + one producer/consumer | практика | — |

### Узел 13.11 — Zero-downtime migrations & schema evolution
**ID:** `13-zero-downtime-migrations` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

> **Prerequisites:** 1.9 (Database Design), 1.12 (EF Core migrations), 10.5 (cloud deploy).  
> **Цель:** менять схему и код под live traffic без простоя и без «migration broke prod».

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 13.11.1 | Why zero-downtime matters — deploy while users online | понимание | — |
| 13.11.2 | Expand–contract pattern — add column nullable → backfill → enforce | **глубоко** | — |
| 13.11.3 | Backward-compatible API during schema change — old + new code | **глубоко** | — |
| 13.11.4 | Rename column without downtime — dual-write / shadow column | **глубоко** | — |
| 13.11.5 | EF migration on startup vs dedicated migration job — trade-offs | **глубоко** | — |
| 13.11.6 | Long-running migration — batch backfill, avoid table lock | **глубоко** | — |
| 13.11.7 | Rollback strategy — down migration vs forward-fix migration | **глубоко** | — |
| 13.11.8 | Blue-green / slot deploy + schema version matrix | **глубоко** | — |
| 13.11.9 | CI gate — idempotent migration script, dry-run on staging clone | практика | — |
| 13.11.10 | Lab: add non-null column to live table with zero downtime | практика | — |

## Фаза 14: Observability & Performance (Production-grade)

> **Prerequisite:** Capstone deployed (фаза 10 или 11). **Цель:** видеть, измерять и чинить prod.

### Узел 14.1 — OpenTelemetry hands-on
**ID:** `14-opentelemetry` | **Статус:** 🔲
> **Материалы:** 📚 0/9 · — 9

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 14.1.1 | Traces, spans, context propagation — W3C traceparent | **глубоко** | — |
| 14.1.2 | ASP.NET Core auto-instrumentation | практика | — |
| 14.1.3 | Custom spans — business operations | практика | — |
| 14.1.4 | Trace HTTP client calls to external APIs | **глубоко** | — |
| 14.1.5 | Trace EF Core / Npgsql queries on span | **глубоко** | — |
| 14.1.6 | Export to Azure Monitor / Jaeger / Grafana Tempo | практика | — |
| 14.1.7 | Correlation: trace ID in Serilog logs | **глубоко** | — |
| 14.1.8 | Baggage — pass tenant_id across services | понимание | — |
| 14.1.9 | Sampling — head-based vs tail-based (concept) | понимание | — |

### Узел 14.2 — Metrics & dashboards
**ID:** `14-metrics` | **Статус:** 🔲
> **Материалы:** 📚 0/8 · — 8

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 14.2.1 | Metrics types: counter, gauge, histogram | **глубоко** | — |
| 14.2.2 | RED method — Rate, Errors, Duration per endpoint | **глубоко** | — |
| 14.2.3 | USE method — Utilization, Saturation, Errors | понимание | — |
| 14.2.4 | Prometheus metrics in .NET (prometheus-net) | практика | — |
| 14.2.5 | Grafana dashboard — API latency p50/p95/p99 | практика | — |
| 14.2.6 | Application Insights — Azure native APM | практика | — |
| 14.2.7 | Custom business metrics — orders_created_total | **глубоко** | — |
| 14.2.8 | Dashboard for capstone — 6+ panels | практика | — |

### Узел 14.3 — Alerting & SLO
**ID:** `14-alerting-slo` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 14.3.1 | SLI → SLO → SLA chain with examples | **глубоко** | — |
| 14.3.2 | Error budget — 99.9% = 43 min downtime/month | **глубоко** | — |
| 14.3.3 | Alert on symptoms (latency) not causes (CPU) | **глубоко** | — |
| 14.3.4 | Alert fatigue — reduce noise, grouping | **глубоко** | — |
| 14.3.5 | PagerDuty/on-call rotation (concept) | понимание | — |
| 14.3.6 | Define 3 SLOs for capstone — write policy | практика | — |
| 14.3.7 | Configure 2 alerts — error rate, p95 latency | практика | — |

### Узел 14.4 — Log aggregation & search
**ID:** `14-log-aggregation` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 14.4.1 | Structured logging recap — JSON logs | **глубоко** | — |
| 14.4.2 | Centralized logs — Azure Log Analytics / Seq / ELK | **глубоко** | — |
| 14.4.3 | Query logs by trace_id — end-to-end request | **глубоко** | — |
| 14.4.4 | Log levels in prod — what's enabled | **глубоко** | — |
| 14.4.5 | PII masking — never log passwords, tokens | **глубоко** | — |
| 14.4.6 | Log-based metrics — count errors by type | практика | — |
| 14.4.7 | Retention policy — cost vs compliance | понимание | — |

### Узел 14.5 — Incident response & postmortem
**ID:** `14-incident-response` | **Статус:** 🔲
> **Материалы:** 📚 0/8 · — 8

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 14.5.1 | Incident lifecycle — detect, triage, mitigate, resolve | **глубоко** | — |
| 14.5.2 | Severity levels — SEV1-SEV4 | **глубоко** | — |
| 14.5.3 | Blameless postmortem template | **глубоко** | — |
| 14.5.4 | Root cause vs contributing factors | **глубоко** | — |
| 14.5.5 | Action items — prevention, detection, mitigation | **глубоко** | — |
| 14.5.6 | Runbook: API returns 500 — step-by-step | практика | — |
| 14.5.7 | Simulated incident drill on capstone | практика | — |
| 14.5.8 | Write one postmortem for simulated outage | практика | — |

### Узел 14.6 — Load & stress testing (project)
**ID:** `14-load-testing` | **Статус:** 🔲
> **Материалы:** 📚 0/8 · — 8

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 14.6.1 | Load test goals — baseline, breaking point, regression | **глубоко** | — |
| 14.6.2 | k6 setup — script GET/POST endpoints | практика | — |
| 14.6.3 | Scenarios: ramp-up, steady, spike | **глубоко** | — |
| 14.6.4 | Metrics: RPS, p50/p95/p99, error rate | **глубоко** | — |
| 14.6.5 | Find breaking point — document at what RPS | **глубоко** | — |
| 14.6.6 | Load test in CI — regression gate (concept) | понимание | — |
| 14.6.7 | Before/after report — optimization iteration | практика | — |
| 14.6.8 | bombardier / NBomber alternatives | понимание | — |

### Узел 14.7 — Database under load
**ID:** `14-db-load` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 14.7.1 | Connection pool exhaustion — symptoms, fix | **глубоко** | — |
| 14.7.2 | Slow query under load — pg_stat_statements | **глубоко** | — |
| 14.7.3 | Missing index discovered by load test | **глубоко** | — |
| 14.7.4 | Lock contention — SELECT FOR UPDATE bottleneck | **глубоко** | — |
| 14.7.5 | Read replica offload (concept) | понимание | — |
| 14.7.6 | Optimize one query — before/after EXPLAIN | практика | — |
| 14.7.7 | Connection string pool size tuning | **глубоко** | — |

### Узел 14.8 — Caching strategy document
**ID:** `14-caching-strategy` | **Статус:** 🔲
> **Материалы:** 📚 0/8 · — 8

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 14.8.1 | Cache-aside implementation review | **глубоко** | — |
| 14.8.2 | What to cache — read-heavy, stable data | **глубоко** | — |
| 14.8.3 | TTL strategy per entity type | **глубоко** | — |
| 14.8.4 | Invalidation on write — cache bust rules | **глубоко** | — |
| 14.8.5 | Cache stampede prevention — lock, early expiry | **глубоко** | — |
| 14.8.6 | HTTP cache headers — ETag, Cache-Control for API | **глубоко** | — |
| 14.8.7 | Write caching strategy doc for capstone | практика | — |
| 14.8.8 | Measure cache hit rate in load test | практика | — |

### Узел 14.9 — .NET & frontend performance profiling
**ID:** `14-profiling` | **Статус:** 🔲
> **Материалы:** 📚 0/9 · — 9

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 14.9.1 | dotnet-counters — monitor live | практика | — |
| 14.9.2 | dotnet-trace — CPU flame graph | **глубоко** | — |
| 14.9.3 | Memory leak hunt — dotnet-gcdump | **глубоко** | — |
| 14.9.4 | BenchmarkDotNet — micro-benchmark critical path | практика | — |
| 14.9.5 | React Profiler — unnecessary re-renders | **глубоко** | — |
| 14.9.6 | Lighthouse CI in GitHub Actions | практика | — |
| 14.9.7 | Bundle analyzer — reduce JS size | практика | — |
| 14.9.8 | Performance budget — max bundle KB | **глубоко** | — |
| 14.9.9 | Fix one backend + one frontend perf issue | практика | — |

### Узел 14.10 — Frontend error tracking (Sentry)
**ID:** `14-sentry` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

> **Prerequisite:** 5.8 (Observability basics), React app in capstone.  
> **Связь:** backend logs/traces — фаза 14.1–14.4; этот узел — **client-side errors & UX failures**.

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 14.10.1 | Why frontend monitoring — errors users see but API logs miss | **глубоко** | — |
| 14.10.2 | Sentry project setup — DSN, environments (dev/staging/prod) | практика | — |
| 14.10.3 | `@sentry/react` — Error Boundary integration | практика | — |
| 14.10.4 | Source maps upload in CI — readable stack traces in prod | **глубоко** | — |
| 14.10.5 | Breadcrumbs — user actions before crash | **глубоко** | — |
| 14.10.6 | Release tracking — semver tag ↔ Sentry release | практика | — |
| 14.10.7 | PII scrubbing — don't send tokens, emails in events | **глубоко** | — |
| 14.10.8 | Performance monitoring — Web Vitals, slow transactions | **глубоко** | — |
| 14.10.9 | Alert rules — spike in `TypeError`, new issue in prod | практика | — |
| 14.10.10 | Correlate with backend — trace ID / user id in Sentry context | **глубоко** | — |

## Фаза 15: Security (Middle+)

> **Prerequisite:** Фазы 3.2, 5.11. **Цель:** threat-driven security, не checklist.

### Узел 15.1 — Threat modeling (STRIDE)
**ID:** `15-threat-modeling` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 15.1.1 | STRIDE: Spoofing, Tampering, Repudiation, Info disclosure, DoS, Elevation | **глубоко** | — |
| 15.1.2 | Data flow diagram for capstone | **глубоко** | — |
| 15.1.3 | Trust boundaries — browser, API, DB, third-party | **глубоко** | — |
| 15.1.4 | Threat per component — mitigations table | **глубоко** | — |
| 15.1.5 | Microsoft Threat Modeling Tool (optional) | практика | — |
| 15.1.6 | Security requirements in user stories | **глубоко** | — |
| 15.1.7 | Re-review after major feature add | практика | — |

### Узел 15.2 — API & application hardening
**ID:** `15-api-hardening` | **Статус:** 🔲
> **Материалы:** 📚 0/8 · — 8

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 15.2.1 | Security headers middleware — full set | **глубоко** | — |
| 15.2.2 | CSP policy for React SPA | **глубоко** | — |
| 15.2.3 | Input validation audit — all endpoints | **глубоко** | — |
| 15.2.4 | Output encoding — XSS prevention in API responses | **глубоко** | — |
| 15.2.5 | IDOR audit — every {id} checks ownership | **глубоко** | — |
| 15.2.6 | Mass assignment prevention — DTO whitelist | **глубоко** | — |
| 15.2.7 | Rate limiting per user/IP — brute force | **глубоко** | — |
| 15.2.8 | Fix 5 findings from self-audit | практика | — |

### Узел 15.3 — Secrets & supply chain security
**ID:** `15-secrets-supply-chain` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 15.3.1 | Secret scanning — gitleaks, GitHub secret scanning | **глубоко** | — |
| 15.3.2 | Rotate JWT signing key — zero-downtime | **глубоко** | — |
| 15.3.3 | Dependency audit — dotnet list package --vulnerable | практика | — |
| 15.3.4 | npm audit + Dependabot workflow | практика | — |
| 15.3.5 | SBOM (Software Bill of Materials) — concept | понимание | — |
| 15.3.6 | Pin dependency versions — reproducible builds | **глубоко** | — |
| 15.3.7 | Signed commits (concept) | понимание | — |

### Узел 15.4 — Penetration testing basics
**ID:** `15-pentest-basics` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 15.4.1 | OWASP ZAP — automated scan on capstone API | практика | — |
| 15.4.2 | Manual tests: SQL injection attempts (should fail) | практика | — |
| 15.4.3 | JWT tampering — alg none, expired token | **глубоко** | — |
| 15.4.4 | CORS misconfiguration test | практика | — |
| 15.4.5 | Fix all high/medium ZAP findings | практика | — |
| 15.4.6 | Security test checklist in CI (concept) | понимание | — |
| 15.4.7 | Responsible disclosure process (concept) | понимание | — |

### Узел 15.5 — Auth advanced topics
**ID:** `15-auth-advanced` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 15.5.1 | OAuth 2.0 Authorization Code + PKCE — full flow | **глубоко** | — |
| 15.5.2 | Social login — Google/Microsoft provider | практика | — |
| 15.5.3 | Refresh token rotation + reuse detection | **глубоко** | — |
| 15.5.4 | Token revocation — blacklist vs short expiry | **глубоко** | — |
| 15.5.5 | MFA/2FA (concept) — TOTP | понимание | — |
| 15.5.6 | Service-to-service auth — client credentials | **глубоко** | — |
| 15.5.7 | Zero Trust — verify every request | **глубоко** | — |

---

## Фаза 16: Advanced Frontend & Architecture

### Узел 16.1 — Next.js & SSR/SSG
**ID:** `16-nextjs` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 16.1.1 | CSR vs SSR vs SSG vs ISR — when which | **глубоко** | — |
| 16.1.2 | Next.js App Router basics | практика | — |
| 16.1.3 | Server Components vs Client Components | **глубоко** | — |
| 16.1.4 | SEO implications — meta, Open Graph | **глубоко** | — |
| 16.1.5 | Migrate one public page to Next.js (capstone marketing) | практика | — |
| 16.1.6 | API routes vs separate ASP.NET backend | **глубоко** | — |
| 16.1.7 | Deployment — Vercel vs Azure Static Web Apps | понимание | — |

### Узел 16.2 — Advanced React Query & data fetching
**ID:** `16-react-query-advanced` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 16.2.1 | Query key factory pattern | **глубоко** | — |
| 16.2.2 | Prefetch on hover — instant navigation | **глубоко** | — |
| 16.2.3 | Infinite queries — cursor pagination UI | **глубоко** | — |
| 16.2.4 | Optimistic updates with rollback — complex form | **глубоко** | — |
| 16.2.5 | Suspense queries (React 18+) | понимание | — |
| 16.2.6 | Offline/cache persistence (concept) | понимание | — |
| 16.2.7 | DevTools debugging — stale vs fetching | практика | — |

### Узел 16.3 — Design system & Storybook
**ID:** `16-design-system` | **Статус:** 🔲
> **Материалы:** 📚 0/6 · — 6

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 16.3.1 | Design tokens — colors, spacing, typography | **глубоко** | — |
| 16.3.2 | Component API design — props, variants, composition | **глубоко** | — |
| 16.3.3 | Storybook setup — catalog UI components | практика | — |
| 16.3.4 | Accessibility in components — keyboard, ARIA | **глубоко** | — |
| 16.3.5 | Document 5+ components in Storybook | практика | — |
| 16.3.6 | shadcn/ui patterns — copy vs npm dependency | понимание | — |

### Узел 16.4 — Accessibility (WCAG AA)
**ID:** `16-a11y` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 16.4.1 | WCAG 2.1 AA — operable, understandable, robust | **глубоко** | — |
| 16.4.2 | axe DevTools audit on capstone | практика | — |
| 16.4.3 | Keyboard-only navigation test | практика | — |
| 16.4.4 | Screen reader test (NVDA/VoiceOver basics) | практика | — |
| 16.4.5 | Color contrast fixes | практика | — |
| 16.4.6 | Focus management in modals | **глубоко** | — |
| 16.4.7 | Fix all critical a11y issues — document | практика | — |

### Узел 16.5 — GraphQL (Hands-on optional)
**ID:** `16-graphql` | **Статус:** 🔲
> **Материалы:** 📚 0/5 · — 5

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 16.5.1 | GraphQL vs REST — decision framework | **глубоко** | — |
| 16.5.2 | Hot Chocolate — schema, Query, Mutation | практика | — |
| 16.5.3 | DataLoader — solve N+1 | **глубоко** | — |
| 16.5.4 | Apollo Client on frontend | практика | — |
| 16.5.5 | When NOT to use GraphQL | **глубоко** | — |

### Узел 16.6 — Multi-tenancy implementation
**ID:** `16-multi-tenant-impl` | **Статус:** 🔲
> **Материалы:** 📚 0/6 · — 6

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 16.6.1 | Implement tenant_id + global query filter in EF | **глубоко** | — |
| 16.6.2 | Tenant resolution middleware — subdomain/header | **глубоко** | — |
| 16.6.3 | Tenant admin vs super admin roles | **глубоко** | — |
| 16.6.4 | Cross-tenant integration tests — must fail | **глубоко** | — |
| 16.6.5 | Tenant onboarding flow | практика | — |
| 16.6.6 | Data export per tenant (GDPR) | понимание | — |

### Узел 16.7 — Feature flags & experimentation
**ID:** `16-feature-flags` | **Статус:** 🔲
> **Материалы:** 📚 0/6 · — 6

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 16.7.1 | Feature flag patterns — release, experiment, ops | **глубоко** | — |
| 16.7.2 | Azure App Configuration feature flags | практика | — |
| 16.7.3 | Custom IFeatureFlagService in ASP.NET | практика | — |
| 16.7.4 | Kill switch — disable feature without deploy | **глубоко** | — |
| 16.7.5 | A/B test basics — split traffic, measure conversion | понимание | — |
| 16.7.6 | Trunk-based development + flags | **глубоко** | — |

### Узел 16.8 — Search implementation lab
**ID:** `16-search-lab` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

> **Prerequisite:** **12.10** (Search system design). Сначала design doc, потом код.  
> **Стек:** PostgreSQL full-text (обязательно) + Elasticsearch (optional track).

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 16.8.1 | Implement search API from 12.10 design — endpoints + DTOs | практика | — |
| 16.8.2 | PostgreSQL FTS — `tsvector`, `tsquery`, GIN index | **глубоко** | — |
| 16.8.3 | Ranking — `ts_rank`, weights, prefix search | **глубоко** | — |
| 16.8.4 | Sync index on write — trigger vs background worker | **глубоко** | — |
| 16.8.5 | Autocomplete — prefix query, debounce on frontend | практика | — |
| 16.8.6 | Faceted filters — category, price range in SQL | **глубоко** | — |
| 16.8.7 | (Optional) Elasticsearch — index mapping, analyzer, bulk reindex | **глубоко** | — |
| 16.8.8 | Reindex strategy — zero-downtime alias swap (concept + optional lab) | **глубоко** | — |
| 16.8.9 | Search UI — highlight snippets, empty state, loading | практика | — |
| 16.8.10 | Measure latency — p95 search under load (k6 or manual) | практика | — |

## Фаза 17: Algorithms & Interview Coding (опционально)

> **Когда нужна:** компании с algo screen (FAANG-like, many product companies).  
> **Можно пропустить**, если целишься в product/.NET shops без live coding.

### Узел 17.1 — Algorithm patterns
**ID:** `17-algo-patterns` | **Статус:** 🔲
> **Материалы:** 📚 0/9 · — 9

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 17.1.1 | Two pointers — sorted array problems | **глубоко** | — |
| 17.1.2 | Sliding window — subarray problems | **глубоко** | — |
| 17.1.3 | Binary search — variants, boundary conditions | **глубоко** | — |
| 17.1.4 | BFS/DFS — tree and graph traversal | **глубоко** | — |
| 17.1.5 | Hash map patterns — frequency, lookup O(1) | **глубоко** | — |
| 17.1.6 | Stack/queue — monotonic stack, valid parentheses | **глубоко** | — |
| 17.1.7 | Recursion vs iteration — when stack overflow risk | **глубоко** | — |
| 17.1.8 | Dynamic programming intro — memoization, tabulation | понимание | — |
| 17.1.9 | Big O analysis in interview — explain complexity | **глубоко** | — |

### Узел 17.2 — LeetCode Medium practice
**ID:** `17-leetcode-medium` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 17.2.1 | Arrays & strings — 10 Medium problems | практика | — |
| 17.2.2 | Hash map & set — 8 Medium problems | практика | — |
| 17.2.3 | Trees & graphs — 8 Medium problems | практика | — |
| 17.2.4 | Intervals & sorting — 6 Medium problems | практика | — |
| 17.2.5 | 15 additional Medium — mixed patterns | практика | — |
| 17.2.6 | Explain solution aloud — interview simulation | **глубоко** | — |
| 17.2.7 | Time-box: 25 min per problem | практика | — |

### Узел 17.3 — Algorithms in engineering (not interviews)
**ID:** `17-algo-engineering` | **Статус:** 🔲
> **Материалы:** 📚 0/5 · — 5

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 17.3.1 | Spot O(n²) in code review — nested loops | **глубоко** | — |
| 17.3.2 | Choose right collection — Dictionary vs List scan | **глубоко** | — |
| 17.3.3 | Database vs in-memory — when SQL wins | **глубоко** | — |
| 17.3.4 | Pagination cursor vs offset — algorithmic cost | **глубоко** | — |
| 17.3.5 | Bloom filter (concept) — probabilistic membership | понимание | — |

---

## Фаза 18: Leadership, Legacy & Team Skills

> **Middle+ = влияние на команду**, не только код.

### Узел 18.1 — Tech lead lite
**ID:** `18-tech-lead` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 18.1.1 | Break epic into vertical slice tasks | **глубоко** | — |
| 18.1.2 | Estimation — story points, t-shirt, three-point | **глубоко** | — |
| 18.1.3 | Risk identification — technical spikes | **глубоко** | — |
| 18.1.4 | Definition of Done — team agreement | **глубоко** | — |
| 18.1.5 | Unblock others — priority of team velocity | **глубоко** | — |
| 18.1.6 | Lead one feature in capstone 2 as «tech lead» | практика | — |
| 18.1.7 | Status communication — async updates | **глубоко** | — |

### Узел 18.2 — Mentoring juniors
**ID:** `18-mentoring` | **Статус:** 🔲
> **Материалы:** 📚 0/6 · — 6

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 18.2.1 | Code review that teaches — questions not orders | **глубоко** | — |
| 18.2.2 | Pair programming — driver/navigator | практика | — |
| 18.2.3 | Explain async to beginner — Feynman technique | **глубоко** | — |
| 18.2.4 | Onboarding checklist for new dev on project | практика | — |
| 18.2.5 | When to let junior struggle vs help | **глубоко** | — |
| 18.2.6 | Document «how we work» — CONTRIBUTING.md | практика | — |

### Узел 18.3 — Stakeholder communication
**ID:** `18-stakeholder` | **Статус:** 🔲
> **Материалы:** 📚 0/5 · — 5

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 18.3.1 | Explain trade-offs to non-technical PM | **глубоко** | — |
| 18.3.2 | Say no with alternatives — scope negotiation | **глубоко** | — |
| 18.3.3 | Technical debt — communicate cost in business terms | **глубоко** | — |
| 18.3.4 | Demo finished feature — structured walkthrough | практика | — |
| 18.3.5 | Write RFC for controversial decision | практика | — |

### Узел 18.4 — Working with legacy code
**ID:** `18-legacy` | **Статус:** 🔲
> **Материалы:** 📚 0/6 · — 6

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 18.4.1 | Characterization tests — lock behavior before refactor | **глубоко** | — |
| 18.4.2 | Seam finding — where to cut for testing | **глубоко** | — |
| 18.4.3 | Strangler fig on monolith module | **глубоко** | — |
| 18.4.4 | Boy Scout Rule in legacy — small improvements | **глубоко** | — |
| 18.4.5 | Refactor one «messy» module in capstone intentionally | практика | — |
| 18.4.6 | Archaeology — git blame, understand why code exists | **глубоко** | — |

### Узел 18.5 — Technical debt management
**ID:** `18-tech-debt` | **Статус:** 🔲
> **Материалы:** 📚 0/5 · — 5

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 18.5.1 | Tech debt register — issue template | практика | — |
| 18.5.2 | Classify: deliberate vs accidental vs bit rot | **глубоко** | — |
| 18.5.3 | Prioritize paydown — impact vs effort matrix | **глубоко** | — |
| 18.5.4 | Allocate 20% sprint capacity — sustainable pace | **глубоко** | — |
| 18.5.5 | Measure debt — code complexity, test gaps | понимание | — |

### Узел 18.6 — Agile at scale (basics)
**ID:** `18-agile-scale` | **Статус:** 🔲
> **Материалы:** 📚 0/5 · — 5

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 18.6.1 | Scrum ceremonies — value of retro, planning | **глубоко** | — |
| 18.6.2 | Kanban — WIP limits, flow | понимание | — |
| 18.6.3 | Cross-team dependency management | **глубоко** | — |
| 18.6.4 | Release train (concept) | понимание | — |
| 18.6.5 | Remote/async collaboration best practices | **глубоко** | — |

---

## Фаза 19: Capstone 2 & Career (Middle+ Graduation)

### Узел 19.1 — Capstone 2: Middle+ Project
**ID:** `19-capstone-2` | **Статус:** 🔲
> **Материалы:** 📚 0/0

> Проект демонстрирует **production thinking**. Можно расширить Capstone 1 или новый домен.

**Обязательные требования (всё из 9.1 PLUS):**

- [ ] **Modular monolith** OR **2–3 microservices** with separate DBs
- [ ] **Outbox pattern** — reliable async events
- [ ] **Saga or choreography** — multi-step business flow with compensation
- [ ] **OpenTelemetry** — traces visible across components
- [ ] **Sentry** — frontend errors tracked with source maps + release
- [ ] **Metrics dashboard** — Grafana or Application Insights (6+ panels)
- [ ] **Load test report** — k6 before/after optimization
- [ ] **Caching strategy document** — implemented + measured hit rate
- [ ] **Deployed to Azure** OR **AKS** with IaC (Bicep/Terraform)
- [ ] **3+ SLOs** with alerts configured
- [ ] **Threat model (STRIDE)** + fixed high/medium findings
- [ ] **10 system design docs** in `/docs/design/` (from phase 12)
- [ ] **5+ ADRs**
- [ ] **Multi-tenant** OR **real-time at scale** (SignalR + Redis backplane, 1K+ connections simulated)
- [ ] **WCAG AA** — critical a11y issues fixed
- [ ] **Incident runbook** + simulated postmortem
- [ ] **CI**: build + test + load test smoke + deploy staging

**Критерии оценки (Middle+ checklist):**

| Критерий | Вес |
|---|---|
| Architecture — modular/micro, bounded contexts | 15% |
| Distributed patterns — outbox, saga, idempotency | 15% |
| Observability — traces, metrics, logs, alerts | 15% |
| Performance — load test evidence, optimizations | 15% |
| Security — threat model, hardened API | 10% |
| Cloud/K8s deploy — prod-like environment | 15% |
| Documentation — designs, ADRs, runbooks | 10% |
| Code quality & tests — meaningful, not trivial | 5% |

**Идеи для Capstone 2:**

1. **Multi-tenant SaaS** — project management per organization
2. **Marketplace** — buyers, sellers, orders, payments mock, notifications
3. **Healthcare appointments** — booking saga, reminders, compliance mindset
4. **Analytics dashboard** — event ingestion, read models, real-time widgets
5. **Developer platform** — API keys, rate limits, usage metering

### Узел 19.2 — Career & portfolio
**ID:** `19-career` | **Статус:** 🔲
> **Материалы:** 📚 0/7 · — 7

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 19.2.1 | GitHub profile — pinned repos, profile README | практика | — |
| 19.2.2 | Resume — Middle+ keywords, metrics (RPS, users, cost saved) | **глубоко** | — |
| 19.2.3 | LinkedIn — project summaries with architecture links | практика | — |
| 19.2.4 | Demo video — 5 min capstone 2 walkthrough | практика | — |
| 19.2.5 | Blog post — «How I built X» technical article | практика | — |
| 19.2.6 | Open source contribution — one PR to .NET/React lib | практика | — |
| 19.2.7 | Networking — local meetups, conferences (online ok) | понимание | — |

### Узел 19.3 — Interview preparation (Middle+)
**ID:** `19-interview-middle-plus` | **Статус:** 🔲
> **Материалы:** 📚 0/10 · — 10

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 19.3.1 | System design mock × 5 — full 45 min each | **глубоко** | — |
| 19.3.2 | Explain capstone 2 architecture — 15 min whiteboard | **глубоко** | — |
| 19.3.3 | Behavioral — 20 STAR stories prepared | практика | — |
| 19.3.4 | .NET deep dive — 30 advanced questions | практика | — |
| 19.3.5 | Trade-off questions — «SQL vs NoSQL for X» | **глубоко** | — |
| 19.3.6 | Live coding × 10 (if targeting algo companies) | практика | — |
| 19.3.7 | Salary negotiation basics | понимание | — |
| 19.3.8 | Mock full loop with AI — system design + coding + behavioral | практика | — |
| 19.3.9 | Company research — stack match, questions to ask | практика | — |
| 19.3.10 | Post-interview retro — improve weak areas | практика | — |

### Узел 19.4 — Commercial experience bridge
**ID:** `19-experience-bridge` | **Статус:** 🔲
> **Материалы:** 📚 0/6 · — 6

| # | Подтема | Глубина | Урок |
|---|---------|---------|------|
| 19.4.1 | Freelance/contract — one real client project | практика | — |
| 19.4.2 | OR: 6+ months commercial employment | практика | — |
| 19.4.3 | OR: significant open-source maintainer role | практика | — |
| 19.4.4 | Code review on others' PRs — GitHub community | практика | — |
| 19.4.5 | Reflect: what only production teaches — write journal | **глубоко** | — |
| 19.4.6 | Middle+ checklist self-assessment — honest score | **глубоко** | — |

> **Note:** Middle+ без commercial/production experience возможен для **strong hire** на Middle+, но **6+ мес работы** остаётся strongest signal для employers.

---

## Как пользоваться Roadmap

### Статусы узлов

- 🔲 **Не начат** — предстоит изучить
- 🔄 **В процессе** — текущий узел
- ✅ **Завершён** — пройден, проверка ≥80%

### Статусы материалов (`lessons/`)

Колонка **Урок** в таблицах подтем и строка **Материалы** под каждым узлом обновляются автоматически при `npm run parse-roadmap` (сканируется папка `lessons/`):

| Маркер | Значение |
|---|---------|---------|------|
| 📚 | Полный урок: lection EN + RU, summary, test, answers |
| 📝 | Частичный: есть файлы, но не все обязательные шаги |
| — | Папка `lessons/{id}/` отсутствует или пуста |

Под узлом: `> **Материалы:** 📚 12/12 · — 0` — сколько подтем узла уже с готовым контентом.

### Порядок обучения (полный трек)

```
MIDDLE TRACK (0–9)
──────────────────
ФАЗА 0: Foundations
0.1 Git → … → 0.10 DevTools
    ↓
ФАЗА 1–2: Backend + Frontend Core
    ↓
ФАЗА 3: Integration (Auth, Fullstack project, Tests)
    ↓
ФАЗА 4–5: Architecture + Production
    ↓
ФАЗА 6: Craft (Code Review, Debugging, System Design basics)
    ↓
ФАЗА 7–8: Performance intro + Horizon topics
    ↓
ФАЗА 9: Capstone 1 🎓 + Interview Prep (Middle)

MIDDLE+ TRACK (10–19) — после Capstone 1
────────────────────────────────────────
ФАЗА 10: Cloud & IaC (Azure, deploy capstone)
    ↓
ФАЗА 11: Kubernetes hands-on
    ↓
ФАЗА 12: System Design deep (10 designs + ADR portfolio)
    ↓
ФАЗА 13: Distributed Systems (outbox, saga, microservices lab)
    ↓
ФАЗА 14: Observability & Performance (OTel, k6, SLO)
    ↓
ФАЗА 15: Security Middle+ (STRIDE, pentest)
    ↓
ФАЗА 16: Advanced Frontend & Architecture
    ↓
ФАЗА 17: Algorithms* (optional)
    ↓
ФАЗА 18: Leadership & Legacy
    ↓
ФАЗА 19: Capstone 2 🏆 + Career + Experience bridge
```

### Порядок обучения (Middle-only, без Middle+)

Остановись после **Фазы 9** — этого достаточно для **уверенного Middle**.

### Жёсткие зависимости (не нарушать)

| Сначала | Потом | Почему |
|---|---|---|
| 2.1-2.2 JavaScript | 2.4+ React | React = JS |
| 1.6-1.7 SQL | 1.12 EF Core | EF генерирует SQL |
| 1.4 Async | 1.10 ASP.NET | ASP.NET полностью async |
| 1.12 EF Core | 1.13 EF Advanced | База перед продвинутым |
| 0.8 Algorithms | 1.18 Algorithms in .NET/EF | Big O → реальный C#/EF код |
| 1.12 EF Core | 1.18 Algorithms in .NET/EF | N+1, projection, pagination cost |
| 1.11 API Design | 1.18 Algorithms in .NET/EF | Pagination patterns в API |
| 3.1 Auth | 3.3 Fullstack Project | Auth в проекте |
| 4.3 Clean Arch | 9.1 Capstone 1 | Архитектура capstone |
| **9.1 Capstone 1** | **10.5 Cloud deploy** | Нужен проект для деплоя |
| **10.1-10.4 Azure** | **10.5 Deploy** | Инфраструктура перед deploy |
| **5.1 Docker** | **11.x Kubernetes** | Containers перед K8s |
| **6.3 SD basics** | **12.x System Design deep** | Фундамент перед 10 designs |
| **5.7 Messaging** | **13.1 Outbox** | Queue basics перед outbox |
| **13.1-13.5 Distributed** | **19.1 Capstone 2** | Patterns перед финальным проектом |
| 1.12 EF Core | 13.11 Zero-downtime migrations | Schema changes под live traffic |
| 12.10 Search design | 16.8 Search lab | Design doc перед реализацией |
| 5.8 Observability | 14.10 Sentry | Основы observability перед frontend APM |
| **14.1-14.5 Observability** | **19.1 Capstone 2** | Monitoring обязателен в capstone 2 |
| **12.x Designs** | **19.3 SD interviews** | Portfolio designs для mock |

### Accelerated path (если Junior опыт)

Если тема знакома — пройди self-test из `lessons/{id}/3.test-yourself.md`:
- ≥80% → статус ✅, переходи к deep dive или следующему узлу
- <80% → полное изучение с нуля

---

## Метрики прогресса

### Middle Track (фазы 0–9)

| Фаза | Узлов | Подтем (approx) | Ориентир времени |
|---|---------|---------|------|
| 0 — Foundations | 10 | ~130 | 4–6 недель |
| 1 — Backend Core | 18 | ~435 | 12–16 недель |
| 2 — Frontend Core | 11 | ~237 | 9–12 недель |
| 3 — Integration | 7 | ~115 | 5–7 недель |
| 4 — Architecture | 8 | ~120 | 5–7 недель |
| 5 — Production | 12 | ~130 | 6–8 недель |
| 6 — Craft | 5 | ~50 | 2–3 недели |
| 7 — Performance | 3 | ~25 | 1–2 недели |
| 8 — Horizon intro | 5 | ~25 | 1–2 недели |
| 9 — Capstone 1 | 2 | project + prep | 4–6 недель |
| **Middle итого** | **81** | **~1245** | **14–20 мес** |

### Middle+ Track (фазы 10–19)

| Фаза | Узлов | Подтем (approx) | Ориентир времени |
|---|---------|---------|------|
| 10 — Cloud & IaC | 8 | ~75 | 6–8 недель |
| 11 — Kubernetes | 9 | ~70 | 6–8 недель |
| 12 — System Design | 12 | ~80 | 8–10 недель |
| 13 — Distributed Systems | 11 | ~85 | 6–8 недель |
| 14 — Observability & Perf | 10 | ~79 | 5–7 недель |
| 15 — Security Middle+ | 5 | ~35 | 3–4 недели |
| 16 — Adv Frontend & Arch | 8 | ~55 | 4–5 недель |
| 17 — Algorithms (optional) | 3 | ~25 | 3–4 недели |
| 18 — Leadership | 6 | ~35 | 2–3 недели |
| 19 — Capstone 2 & Career | 4 | project + ~30 | 6–8 недель |
| **Middle+ итого** | **76** | **~569** | **8–12 мес** |

### Grand Total

| | Узлов | Подтем | Время |
|---|-------|--------|-------|
| **Full path (0–19)** | **~157** | **~1815** | **22–32 мес** |
| Middle only (0–9) | 81 | ~1245 | 14–20 мес |
| Middle+ addon (10–19) | 76 | ~569 | 8–12 мес |

### Tracking

Создай файл `PROGRESS.md` для отслеживания:

```markdown
# Мой прогресс

| Узел | Статус | Дата начала | Дата завершения | Quiz % |
|------|--------|-------------|-----------------|--------|
| 00-git | 🔲 | | | |
```

---

## Следующий шаг

Начни с **Узла 0.1 — Git: основы** или скажи AI-наставнику:

> «Начинаем обучение. Узел 0.1 — Git.»

Начни с **подтемы 0.1.1** — создай папку `lessons/0.1.1/` и скажи AI:

> «Заполни урок 0.1.1»

AI создаст `1.lection-eng.md`, `2.lection-ru.md`, `3.summary.md`, `4.test-yourself.md` и остальные файлы по шаблону из [AGENTS.md](./AGENTS.md).

Если Git уже знаешь:

> «Заполни урок 0.1.1» → пройди `3.test-yourself.md` без подглядывания в `4.test-yourself-answers.md`.

