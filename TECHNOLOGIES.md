# Стек технологий: Junior → Middle Fullstack

> Цель: не «знать названия», а **понимать принципы работы** каждой технологии на уровне, достаточном для самостоятельных архитектурных решений, отладки сложных багов и code review.

---

## Ядро (обязательно, глубоко)

### Backend — C# / .NET


| Технология                             | Зачем                                                               |
| -------------------------------------- | ------------------------------------------------------------------- |
| **C#**                                 | Язык, на котором строится весь backend-стек                         |
| **.NET Runtime (CLR, GC, JIT/AOT)**    | Понимание того, как код реально выполняется                         |
| **.NET SDK / CLI**                     | dotnet new, build, run, publish, tool management                    |
| **ASP.NET Core**                       | Web-фреймворк: HTTP pipeline, middleware, DI, hosting               |
| **Entity Framework Core**              | ORM: mapping, migrations, change tracking, query translation        |
| **ADO.NET / Npgsql**                   | Прямая работа с БД без ORM — понимать, что делает EF «под капотом»  |
| **LINQ**                               | Декларативные запросы к коллекциям и IQueryable                     |
| **Dependency Injection**               | IoC-контейнер ASP.NET Core, lifetimes, scopes                       |
| **Async/Await**                        | Асинхронная модель C#: Task, SynchronizationContext, ConfigureAwait |
| **Minimal APIs**                       | Лёгкие endpoints без controllers — когда уместны                    |
| **IHostedService / BackgroundService** | Фоновые задачи внутри приложения                                    |
| **System.Text.Json**                   | Сериализация JSON — как ASP.NET Core сериализует ответы             |
| **Records, Pattern Matching**          | Современный idiomatic C#                                            |




### База данных


| Технология                         | Зачем                                                   |
| ---------------------------------- | ------------------------------------------------------- |
| **PostgreSQL**                     | Основная СУБД: SQL, индексы, транзакции, планы запросов |
| **SQL**                            | Язык запросов — независимо от ORM                       |
| **Redis**                          | Кэш, сессии, pub/sub, distributed locks                 |
| **Database Design**                | ER-диаграммы, нормализация, индексная стратегия         |
| **Migrations**                     | EF Core Migrations + SQL-скрипты для production         |
| **PgBouncer / Connection Pooling** | Управление соединениями под нагрузкой                   |




### Frontend


| Технология                         | Зачем                                                          |
| ---------------------------------- | -------------------------------------------------------------- |
| **HTML**                           | Семантика, accessibility, DOM                                  |
| **CSS**                            | Layout (Flexbox, Grid), cascade, specificity, responsive       |
| **JavaScript (ES6+)**              | Основа React и TypeScript — без JS React не понять             |
| **TypeScript**                     | Статическая типизация, generics, type narrowing, utility types |
| **React**                          | Компоненты, hooks, reconciliation, state management            |
| **React Router**                   | Client-side routing, nested routes, loaders                    |
| **TanStack Query (React Query)**   | Server state, caching, invalidation, optimistic updates        |
| **Vite**                           | Dev server, HMR, bundling, production build                    |
| **React Hook Form + Zod**          | Формы и runtime-валидация на frontend                          |
| **Tailwind CSS (или CSS Modules)** | Практичная стилизация в реальных проектах                      |
| **Axios / fetch wrapper**          | HTTP-клиент с interceptors, типизацией, retry                  |




### Инфраструктура и инструменты


| Технология                   | Зачем                                                          |
| ---------------------------- | -------------------------------------------------------------- |
| **Git**                      | Ветки, merge/rebase, conflict resolution, conventional commits |
| **GitHub / GitLab**          | PR/MR workflow, code review, issues                            |
| **Docker**                   | Контейнеры, Dockerfile, docker-compose, multi-stage builds     |
| **HTTP/HTTPS**               | Методы, статусы, headers, cookies, CORS, TLS                   |
| **REST API Design**          | Ресурсы, версионирование, pagination, HATEOAS (основы)         |
| **OpenAPI / Swagger**        | Документирование и контракт API                                |
| **Linux CLI**                | Серверная среда: файлы, процессы, permissions, ssh, systemd    |
| **Nginx**                    | Reverse proxy, static files, load balancing, SSL termination   |
| **Bash / PowerShell basics** | Скрипты автоматизации, CI-команды                              |
| **Environment Variables**    | Configuration per environment, secrets vs config               |


---



## Архитектура и паттерны (Middle-уровень)


| Технология / Концепция                            | Зачем                                                                       |
| ------------------------------------------------- | --------------------------------------------------------------------------- |
| **SOLID**                                         | Принципы проектирования классов и модулей                                   |
| **DRY, KISS, YAGNI**                              | Баланс между абстракцией и простотой                                        |
| **Design Patterns (GoF)**                         | Singleton, Factory, Strategy, Observer, Decorator, Repository, Unit of Work |
| **Clean Architecture / Layered Architecture**     | Разделение Domain / Application / Infrastructure / Presentation             |
| **Vertical Slice Architecture**                   | Альтернатива слоям — feature-based organization                             |
| **CQRS (basics)**                                 | Разделение команд и запросов, MediatR                                       |
| **Domain-Driven Design (basics)**                 | Entities, Value Objects, Aggregates, Ubiquitous Language                    |
| **Event-Driven Architecture (basics)**            | Domain events, outbox pattern, eventual consistency                         |
| **Result Pattern / Railway Oriented Programming** | Явная обработка ошибок без exceptions everywhere                            |
| **Specification Pattern**                         | Комposable query logic                                                      |
| **Anti-Corruption Layer**                         | Интеграция с legacy/external systems                                        |


---



## Безопасность и аутентификация


| Технология                        | Зачем                                                    |
| --------------------------------- | -------------------------------------------------------- |
| **ASP.NET Core Identity**         | Users, roles, claims, password hashing                   |
| **JWT (JSON Web Tokens)**         | Stateless auth, claims, refresh tokens                   |
| **OAuth 2.0 / OpenID Connect**    | Delegated auth, social login (Google, etc.)              |
| **OWASP Top 10**                  | XSS, CSRF, SQL Injection, IDOR — знать и защищать        |
| **HTTPS / TLS**                   | Certificates, HSTS, secure cookies                       |
| **Rate Limiting**                 | Защита от brute force и DDoS (basics)                    |
| **Secrets Management**            | User Secrets, environment variables, Key Vault (concept) |
| **Content Security Policy (CSP)** | Защита от XSS на frontend                                |
| **Input Sanitization**            | Валидация + encoding — defense in depth                  |


---



## Тестирование


| Технология                                    | Зачем                                        |
| --------------------------------------------- | -------------------------------------------- |
| **xUnit / NUnit**                             | Unit-тесты backend                           |
| **Moq / NSubstitute**                         | Mocking dependencies                         |
| **FluentAssertions**                          | Readable assertions                          |
| **Integration Tests (WebApplicationFactory)** | Тестирование API end-to-end                  |
| **Testcontainers**                            | Real PostgreSQL/Redis in tests               |
| **Vitest / Jest**                             | Unit-тесты frontend                          |
| **React Testing Library**                     | Тестирование компонентов через user behavior |
| **MSW (Mock Service Worker)**                 | Mock API at network level                    |
| **Playwright / Cypress**                      | E2E-тесты                                    |
| **BenchmarkDotNet**                           | Performance regression tests (basics)        |
| **Stryker / mutation testing (concept)**      | Качество тестов                              |


---



## DevOps и качество кода


| Технология                                   | Зачем                                         |
| -------------------------------------------- | --------------------------------------------- |
| **CI/CD (GitHub Actions / GitLab CI)**       | Автосборка, тесты, deploy                     |
| **Serilog / structured logging**             | Логирование с контекстом, correlation ID      |
| **OpenTelemetry (basics)**                   | Traces, metrics, logs — unified observability |
| **Health Checks**                            | Liveness/readiness probes                     |
| **FluentValidation**                         | Валидация входных данных                      |
| **AutoMapper / Mapster**                     | Mapping DTO ↔ Entity (понимать trade-offs)    |
| **Hangfire / Quartz.NET**                    | Scheduled jobs, retries, dashboard            |
| **SignalR**                                  | Real-time: WebSockets, hubs, groups           |
| **EditorConfig + analyzers**                 | Единый code style, Roslyn analyzers           |
| **SonarQube / code quality gates (concept)** | Static analysis в CI                          |
| **Semantic Versioning**                      | Versioning API и releases                     |


---



## Коммуникация и API-расширения


| Технология                                 | Зачем                                     |
| ------------------------------------------ | ----------------------------------------- |
| **SignalR**                                | WebSockets, SSE, real-time notifications  |
| **gRPC**                                   | High-performance RPC, protobuf, streaming |
| **Webhooks**                               | Outbound event notifications              |
| **Server-Sent Events (SSE)**               | One-way server → client streaming         |
| **GraphQL (basics)**                       | Альтернатива REST, Hot Chocolate          |
| **RabbitMQ / MassTransit**                 | Message broker, async communication       |
| **Apache Kafka (concept)**                 | Event streaming at scale                  |
| **Email (MailKit / SendGrid)**             | Transactional emails                      |
| **Blob Storage (S3 / Azure Blob concept)** | File uploads, CDN                         |


---



## Frontend — расширенный стек


| Технология                      | Зачем                                                |
| ------------------------------- | ---------------------------------------------------- |
| **ESLint + Prettier**           | Linting и formatting                                 |
| **Zustand / Redux Toolkit**     | Client global state — когда React Query недостаточно |
| **Framer Motion (basics)**      | UI animations                                        |
| **Storybook (basics)**          | Component catalog, isolated development              |
| **PWA (basics)**                | Service workers, offline, installability             |
| **Web Vitals / Lighthouse**     | Core Web Vitals, performance audit                   |
| **i18n (react-i18next basics)** | Internationalization                                 |
| **Error Boundaries**            | Graceful UI failure handling                         |
| **Suspense + lazy loading**     | Code splitting, loading states                       |


---



## Дополнительно (расширение горизонта Middle+)


| Технология                          | Зачем                                          |
| ----------------------------------- | ---------------------------------------------- |
| **Elasticsearch**                   | Full-text search, log aggregation              |
| **Kubernetes (basics)**             | Orchestration, pods, services, ingress         |
| **Terraform (concept)**             | Infrastructure as Code                         |
| **WebAssembly (basics)**            | Blazor WASM, performance-critical frontend     |
| **Prometheus + Grafana**            | Metrics, alerting, dashboards                  |
| **Feature Flags**                   | LaunchDarkly / custom — gradual rollout        |
| **Blue-Green / Canary Deployments** | Zero-downtime deployment strategies            |
| **CQRS + Event Sourcing (intro)**   | Audit trail, temporal queries                  |
| **Multi-tenancy patterns**          | Shared DB vs DB per tenant                     |
| **API Gateway (concept)**           | YARP, Ocelot, Kong — routing, auth, rate limit |


---



## Computer Science & Fundamentals


| Концепция                           | Зачем                                             |
| ----------------------------------- | ------------------------------------------------- |
| **Big O notation**                  | Оценка сложности алгоритмов и запросов            |
| **Data Structures**                 | Array, List, HashMap, Stack, Queue, Tree, Graph   |
| **Sorting & Searching**             | Binary search, quicksort — понимать, не заучивать |
| **Recursion**                       | Деревья, divide & conquer                         |
| **Concurrency vs Parallelism**      | Threads, locks — связь с async                    |
| **TCP/IP, DNS, OSI model (basics)** | Как данные travel по сети                         |
| **Memory model**                    | Stack, heap — в C# и JS                           |
| **Compilation vs Interpretation**   | C# JIT, JS V8, TypeScript transpile               |
| **Unicode, UTF-8, encoding**        | Почему ломается кириллица                         |
| **Floating point pitfalls**         | decimal vs double vs float                        |


---



## Soft skills и методология


| Навык                                  | Зачем                                                        |
| -------------------------------------- | ------------------------------------------------------------ |
| **Code Review**                        | Читать и давать конструктивный feedback                      |
| **Debugging**                          | Debugger (VS/Rider), browser DevTools, SQL EXPLAIN, dotTrace |
| **Technical Writing**                  | README, ADR (Architecture Decision Records), RFC             |
| **Agile / Scrum / Kanban basics**      | Sprint, backlog, estimation, WIP limits                      |
| **System Design (basics)**             | Capacity estimation, trade-offs, diagramming (C4, sequence)  |
| **Estimation**                         | Story points, t-shirt sizing, breaking down tasks            |
| **Incident Response (basics)**         | Postmortem, root cause analysis                              |
| **Pair Programming / Mob Programming** | Collaborative problem solving                                |
| **Mentoring juniors**                  | Объяснять сложное простым языком                             |
| **Time management**                    | Deep work, Pomodoro, learning schedule                       |


---



## IDE и инструменты разработчика


| Инструмент                     | Зачем                                  |
| ------------------------------ | -------------------------------------- |
| **Visual Studio / Rider**      | Debugger, profiler, refactoring, NuGet |
| **VS Code / Cursor**           | Frontend development, extensions       |
| **Postman / Insomnia / Bruno** | API testing, collections, environments |
| **DBeaver / pgAdmin**          | SQL exploration, ER diagrams           |
| **Redis Insight / CLI**        | Inspect cache keys                     |
| **Docker Desktop**             | Local container management             |
| **Windows Terminal / iTerm**   | Multiplexing, profiles                 |
| **ngrok / Cloudflare Tunnel**  | Expose local dev to internet           |
| **Fiddler / Charles (basics)** | HTTP traffic inspection                |


---



## Приоритет изучения

```
MIDDLE (0–9):
Фаза 0–9:  … → Capstone 1 + Interview

MIDDLE+ (10–19):
Фаза 10:  Azure → Deploy → IaC → Networking → DR
Фаза 11:  Kubernetes (hands-on) → Helm → AKS
Фаза 12:  System Design (10 задач + ADR portfolio)
Фаза 13:  Outbox → Saga → Microservices lab → YARP → Event Sourcing
Фаза 14:  OpenTelemetry → Metrics → SLO → k6 load testing
Фаза 15:  STRIDE → API hardening → Pentest
Фаза 16:  Next.js → Advanced React Query → a11y → Multi-tenant
Фаза 17:  Algorithms* (optional)
Фаза 18:  Tech lead → Mentoring → Legacy code
Фаза 19:  Capstone 2 + Career
```

Подробный порядок — в [ROADMAP.md](./ROADMAP.md).

---



## Матрица: технология → узел Roadmap


| Технология       | Основной узел ROADMAP                     |
| ---------------- | ----------------------------------------- |
| Git              | `00-git`, `00-git-advanced`               |
| HTTP             | `00-http`, `00-networking`                |
| C#               | `01-csharp-*` (5 узлов)                   |
| SQL / PostgreSQL | `01-sql`, `01-postgresql`, `01-db-design` |
| ASP.NET Core     | `01-aspnetcore-*` (4 узла)                |
| EF Core          | `01-efcore`, `01-efcore-advanced`         |
| JavaScript / TS  | `02-javascript`, `02-typescript`          |
| React            | `02-react-*` (5 узлов)                    |
| Auth             | `03-auth`, `03-security-deep`             |
| Testing          | `03-testing`, `03-testing-advanced`       |
| Architecture     | `04-*` (8 узлов)                          |
| DevOps           | `05-*` (12 узлов)                         |
| Capstone 1       | `09-capstone`                             |
| Azure / Cloud    | `10-*` (8 узлов)                          |
| Kubernetes       | `11-*` (9 узлов)                          |
| System Design    | `12-*` (12 узлов)                         |
| Distributed      | `13-*` (10 узлов)                         |
| Observability+   | `14-*` (9 узлов)                          |
| Security Middle+ | `15-*` (5 узлов)                          |
| Capstone 2       | `19-capstone-2`                           |


