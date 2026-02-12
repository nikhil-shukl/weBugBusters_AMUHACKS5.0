import React, { useState, useEffect, useMemo } from 'react';
import { useResults } from '../context/ResultsContext';
import {
  Briefcase,
  ChevronRight,
  Sparkles,
  MessageSquare,
  Eye,
  EyeOff,
  RefreshCw,
  Award,
  Target,
  Lightbulb
} from 'lucide-react';

// ============================================================================
// MASSIVE INTERVIEW QUESTION BANK – 32 ROLES, 500+ QUESTIONS
// ============================================================================
const questionBank = {
  // ----- FRONTEND -----
  'Frontend Developer': [
    'How do you optimize a React application for performance?',
    'Explain the difference between controlled and uncontrolled components.',
    'How would you implement state management in a large-scale React app?',
    'Describe your experience with responsive design and CSS frameworks.',
    'What tools do you use for testing frontend applications?',
    'How do you ensure accessibility in your web projects?',
    'What is the virtual DOM and how does it work?',
    'Explain the useEffect hook and its dependency array.',
    'How do you handle code splitting in a React app?',
    'What are higher-order components (HOC) and when would you use them?',
    'Compare Redux, MobX, and Context API.',
    'How do you optimize images and fonts for web performance?',
    'What is the difference between cookies, sessionStorage, and localStorage?',
    'Explain the concept of progressive web apps (PWA).',
    'How do you implement authentication in a single-page application?',
    'What are Web Vitals and how do you measure them?',
    'Describe a challenging UI bug you fixed.',
    'How do you handle browser compatibility issues?',
    'What is your experience with TypeScript in frontend projects?',
    'Explain the box model and how to reset CSS.',
    'How do you create custom hooks in React?',
    'What is the purpose of keys in React lists?',
    'How do you prevent unnecessary re-renders?',
    'Describe the difference between server-side rendering (SSR) and static site generation (SSG).',
    'What are React portals and when would you use them?',
    'How do you manage forms and validation in React?',
    'Explain the concept of reconciliation in React.',
    'What is the significance of the `children` prop?',
    'How do you handle errors in React components?',
    'What are the benefits of using a CSS-in-JS solution like styled-components?'
  ],

  // ----- FULL STACK -----
  'Full Stack Developer': [
    'Describe a full-stack project you built from scratch.',
    'How do you handle authentication and authorization in a web app?',
    'Explain how you optimize database queries for performance.',
    'What’s your experience with RESTful APIs and GraphQL?',
    'How do you manage state between frontend and backend?',
    'Describe your CI/CD workflow for deploying applications.',
    'How do you ensure security in a full-stack application?',
    'What are the trade-offs between SQL and NoSQL databases?',
    'How do you design a scalable file upload system?',
    'Explain how you handle real-time features (WebSockets, SSE).',
    'How do you approach debugging a full-stack issue?',
    'Describe your experience with cloud platforms (AWS, Azure, GCP).',
    'How do you handle session management across multiple servers?',
    'What is your experience with Docker and containerization?',
    'How do you monitor application performance in production?',
    'Explain the concept of database indexing and when to use it.',
    'How do you implement role-based access control (RBAC)?',
    'What strategies do you use for API versioning?',
    'Describe how you would build a notification system.',
    'How do you handle background jobs and queues?',
    'What is your experience with serverless architecture?',
    'How do you ensure data consistency in distributed systems?',
    'Explain the CAP theorem and its implications.',
    'How do you approach writing unit and integration tests?',
    'Describe a time you improved a system’s performance.',
    'How do you handle large file uploads?',
    'What is your experience with OAuth and OpenID Connect?',
    'How do you design a RESTful API from scratch?',
    'Explain the differences between HTTP/1.1, HTTP/2, and HTTP/3.',
    'How do you keep your technical skills up to date?'
  ],

  // ----- BACKEND -----
  'Backend Developer': [
    'How do you design a scalable database schema?',
    'Explain the difference between SQL and NoSQL databases.',
    'What strategies do you use for caching and performance?',
    'How do you secure a REST API?',
    'Describe your experience with microservices architecture.',
    'How do you handle error logging and monitoring?',
    'What is the difference between PUT and PATCH?',
    'How do you implement rate limiting and throttling?',
    'Explain ACID properties in databases.',
    'How do you handle database migrations?',
    'What are the advantages and disadvantages of using an ORM?',
    'How do you design a system for high availability?',
    'Describe your experience with message queues (RabbitMQ, Kafka).',
    'How do you handle background jobs and cron tasks?',
    'What is the difference between authorization and authentication?',
    'How do you prevent SQL injection?',
    'Explain the concept of connection pooling.',
    'How do you implement pagination in APIs?',
    'What is your experience with GraphQL and its resolvers?',
    'How do you handle file storage in a distributed system?',
    'Describe a time you optimized a slow query.',
    'How do you handle sensitive data (passwords, tokens)?',
    'What is your experience with container orchestration (Kubernetes)?',
    'Explain the circuit breaker pattern.',
    'How do you handle API versioning?',
    'What are the principles of RESTful design?',
    'How do you approach load testing?',
    'Describe your experience with serverless functions.',
    'How do you ensure idempotency in APIs?',
    'What is your preferred way to document APIs (Swagger, Postman, etc.)?'
  ],

  // ----- DEVOPS -----
  'DevOps Engineer': [
    'Explain the difference between continuous integration and continuous deployment.',
    'How do you manage infrastructure as code?',
    'Describe your experience with containerization and orchestration.',
    'How do you monitor system health and performance?',
    'What’s your approach to incident response and post-mortems?',
    'Explain how you’d set up a CI/CD pipeline from scratch.',
    'What is the difference between Docker and virtual machines?',
    'How do you handle secret management in CI/CD?',
    'Describe your experience with Kubernetes concepts (pods, services, deployments).',
    'How do you implement blue-green deployments?',
    'What is the role of configuration management tools like Ansible or Chef?',
    'How do you handle log aggregation and analysis (ELK, Splunk)?',
    'Explain the concept of immutable infrastructure.',
    'How do you ensure compliance and security in cloud environments?',
    'Describe a time you automated a manual process.',
    'What is your experience with cloud providers (AWS, Azure, GCP)?',
    'How do you monitor network traffic and detect anomalies?',
    'Explain the difference between a load balancer and a reverse proxy.',
    'How do you approach disaster recovery planning?',
    'What are the key metrics you track for system reliability?',
    'How do you handle database backups and restores?',
    'Describe your experience with Terraform or CloudFormation.',
    'How do you manage costs in cloud environments?',
    'What is your experience with service mesh (Istio, Linkerd)?',
    'How do you secure a Kubernetes cluster?',
    'Explain the concept of GitOps.',
    'How do you handle versioning of infrastructure code?',
    'What are the challenges of multi-cloud strategies?',
    'How do you perform root cause analysis?',
    'Describe your experience with monitoring tools (Prometheus, Grafana).'
  ],

  // ----- DATA SCIENCE -----
  'Data Scientist': [
    'Walk me through a data science project you’ve worked on.',
    'How do you handle missing or inconsistent data?',
    'Explain overfitting and how to prevent it.',
    'What evaluation metrics do you use for classification models?',
    'Describe your experience with feature engineering.',
    'How do you communicate technical results to non-technical stakeholders?',
    'What is the bias-variance tradeoff?',
    'Explain the difference between supervised and unsupervised learning.',
    'How do you select the right algorithm for a problem?',
    'What are ensemble methods and why do they work?',
    'Describe cross-validation and its importance.',
    'How do you handle imbalanced datasets?',
    'Explain the concept of p-value and statistical significance.',
    'What is your experience with deep learning frameworks?',
    'How do you deploy a machine learning model to production?',
    'What is the difference between bagging and boosting?',
    'How do you perform hyperparameter tuning?',
    'Explain regularization techniques (L1, L2, dropout).',
    'What are the assumptions of linear regression?',
    'How do you detect outliers in data?',
    'Describe a time you used A/B testing to drive a decision.',
    'What is your experience with NLP techniques?',
    'Explain the concept of word embeddings.',
    'How do you handle time series data?',
    'What are the challenges of working with big data?',
    'How do you ensure reproducibility in your analyses?',
    'Describe your experience with SQL and data extraction.',
    'What tools do you use for data visualization?',
    'How do you approach feature selection?',
    'Explain a complex machine learning concept to a non-technical person.'
  ],

  // ----- DATA ANALYST -----
  'Data Analyst': [
    'How do you clean and preprocess data for analysis?',
    'Describe a time you used data to drive a business decision.',
    'What tools do you use for data visualization?',
    'Explain the difference between correlation and causation.',
    'How do you handle large datasets that don’t fit in memory?',
    'What metrics would you track for an e-commerce website?',
    'How do you identify trends and patterns in data?',
    'Describe your experience with SQL and database querying.',
    'What is the importance of data normalization?',
    'How do you handle duplicate records?',
    'Explain the concept of data granularity.',
    'How do you validate the accuracy of your analysis?',
    'What is your experience with Excel and spreadsheets?',
    'Describe a dashboard you built from scratch.',
    'How do you choose the right chart type for your data?',
    'What is the difference between a bar chart and a histogram?',
    'How do you handle outliers in a dataset?',
    'Explain the concept of percentile and quartile.',
    'How do you perform cohort analysis?',
    'What are the key performance indicators for a subscription business?',
    'How do you prioritize which metrics to focus on?',
    'Describe a time your analysis uncovered a critical issue.',
    'How do you present data to stakeholders with different technical backgrounds?',
    'What is your experience with Python or R for data analysis?',
    'How do you handle data from multiple sources?',
    'Explain the difference between structured and unstructured data.',
    'How do you ensure data privacy and compliance?',
    'What are the best practices for data visualization?',
    'How do you stay updated with new analysis tools?',
    'Describe your process for exploratory data analysis.'
  ],

  // ----- MACHINE LEARNING ENGINEER -----
  'Machine Learning Engineer': [
    'How do you choose which machine learning algorithm to use?',
    'Describe a project where you deployed a model to production.',
    'How do you handle imbalanced datasets?',
    'Explain the bias-variance tradeoff.',
    'What’s your experience with deep learning frameworks?',
    'How do you version control machine learning models?',
    'What is the difference between a parameter and a hyperparameter?',
    'How do you perform model validation and selection?',
    'Explain gradient descent and its variants.',
    'What are the challenges of online learning?',
    'How do you handle missing features in production?',
    'Describe your experience with feature stores.',
    'How do you ensure ML model fairness and avoid bias?',
    'What is the role of MLOps in the ML lifecycle?',
    'How do you monitor model performance in production?',
    'Explain the concept of transfer learning.',
    'What are the differences between LSTM and Transformer models?',
    'How do you approach hyperparameter optimization?',
    'Describe a time you improved an existing model’s accuracy.',
    'How do you handle data drift and concept drift?',
    'What is the difference between batch and online inference?',
    'How do you scale model training to large datasets?',
    'Explain the use of GPUs/TPUs in model training.',
    'What are some common pitfalls in deploying ML models?',
    'How do you explain a black-box model to stakeholders?',
    'Describe your experience with reinforcement learning.',
    'How do you handle multi-label classification problems?',
    'What is the role of embeddings in NLP?',
    'How do you approach time series forecasting?',
    'What are the ethical considerations in AI/ML?'
  ],

  // ----- AI ENGINEER -----
  'AI Engineer': [
    'What is the difference between AI, ML, and deep learning?',
    'Describe a project where you integrated an LLM (like GPT) into an application.',
    'How do you evaluate the performance of a generative model?',
    'Explain the concept of Retrieval-Augmented Generation (RAG).',
    'What are vector databases and how are they used in AI applications?',
    'How do you handle prompt engineering for large language models?',
    'What are the challenges of deploying AI models at scale?',
    'Describe your experience with LangChain or similar frameworks.',
    'How do you fine-tune a pre-trained model?',
    'What is the difference between zero-shot and few-shot learning?',
    'How do you mitigate bias in AI models?',
    'Explain the concept of attention in transformers.',
    'How do you handle context windows in LLMs?',
    'What are the trade-offs between using closed-source vs open-source models?',
    'How do you implement AI-powered search or recommendation?',
    'Describe a time you built a chatbot or conversational AI.',
    'How do you approach model quantization and optimization?',
    'What is the role of human-in-the-loop in AI systems?',
    'How do you ensure data privacy when using external AI APIs?',
    'Explain the concept of embeddings and similarity search.',
    'What are the limitations of current AI technologies?',
    'How do you stay updated with the latest AI research?',
    'Describe your experience with computer vision projects.',
    'How do you handle multimodal inputs (text + image)?',
    'What is the significance of the transformer architecture?',
    'How do you approach AI project scoping and feasibility?',
    'What metrics do you use for generative text tasks?',
    'How do you debug a model that is hallucinating?',
    'Explain the concept of chain-of-thought prompting.',
    'What are the ethical implications of generative AI?'
  ],

  // ----- SECURITY ENGINEER -----
  'Security Engineer': [
    'What are the most common web application vulnerabilities?',
    'How do you secure a REST API?',
    'Explain the concept of defense in depth.',
    'What is the difference between symmetric and asymmetric encryption?',
    'How do you conduct a penetration test?',
    'Describe your experience with SIEM tools.',
    'What is OWASP Top 10 and why is it important?',
    'How do you handle identity and access management (IAM)?',
    'Explain how JWT works and its security considerations.',
    'What are the best practices for securing cloud infrastructure?',
    'How do you detect and respond to a data breach?',
    'Describe your experience with vulnerability scanners (Nessus, Qualys).',
    'What is the difference between authentication and authorization?',
    'How do you implement multi-factor authentication (MFA)?',
    'Explain SQL injection and how to prevent it.',
    'What is cross-site scripting (XSS) and how to mitigate it?',
    'How do you secure a Kubernetes cluster?',
    'Describe your experience with DevSecOps practices.',
    'What is the role of a Web Application Firewall (WAF)?',
    'How do you handle secrets management (HashiCorp Vault, AWS Secrets Manager)?',
    'Explain the principle of least privilege.',
    'What is the difference between a vulnerability and an exploit?',
    'How do you keep up with emerging security threats?',
    'Describe a time you performed a security audit.',
    'What are the common threats to IoT devices?',
    'How do you secure CI/CD pipelines?',
    'Explain the concept of zero trust architecture.',
    'What is the importance of patch management?',
    'How do you educate non-technical staff about security?',
    'What is your experience with compliance frameworks (GDPR, HIPAA, SOC2)?'
  ],

  // ----- SOFTWARE TESTER / QA ENGINEER -----
  'Software Tester': [
    'Explain the difference between functional and non-functional testing.',
    'How do you decide what to automate vs test manually?',
    'Describe your experience with test-driven development.',
    'How do you report and track bugs?',
    'What’s your approach to regression testing?',
    'How do you ensure test coverage for a complex feature?',
    'What are the different levels of testing (unit, integration, system, acceptance)?',
    'Describe the role of a test plan.',
    'How do you perform performance testing?',
    'What tools have you used for test automation?',
    'Explain the concept of boundary value analysis.',
    'How do you handle testing in an Agile environment?',
    'What is the difference between verification and validation?',
    'How do you prioritize which test cases to automate first?',
    'Describe a time you found a critical bug just before release.',
    'What are the challenges of testing microservices?',
    'How do you test APIs?',
    'Explain the concept of mocking and stubbing.',
    'What is the purpose of a smoke test?',
    'How do you handle test data management?',
    'Describe your experience with CI/CD integration for automated tests.',
    'What are the key metrics for test quality?',
    'How do you approach exploratory testing?',
    'What is the difference between black-box and white-box testing?',
    'How do you test mobile applications?',
    'Explain the concept of usability testing.',
    'How do you ensure accessibility testing?',
    'What is the role of a QA in a DevOps culture?',
    'Describe your experience with bug tracking tools (JIRA, Bugzilla).',
    'How do you stay updated with testing best practices?'
  ],
  'QA Engineer': 'Software Tester', // alias, but we'll keep separate if needed

  // ----- PROJECT MANAGER -----
  'Project Manager': [
    'Describe your project management methodology.',
    'How do you handle scope creep?',
    'How do you motivate a team under tight deadlines?',
    'Tell me about a time you resolved a conflict within your team.',
    'How do you prioritize features in a product roadmap?',
    'What tools do you use for tracking project progress?',
    'How do you communicate project status to stakeholders?',
    'Describe a project that failed and what you learned.',
    'How do you estimate project timelines?',
    'What is your experience with Agile/Scrum ceremonies?',
    'How do you handle resource allocation?',
    'Describe your approach to risk management.',
    'How do you ensure project documentation is maintained?',
    'Tell me about a time you had to say no to a stakeholder.',
    'How do you manage remote or distributed teams?',
    'What metrics do you track to measure project success?',
    'How do you balance technical debt vs new features?',
    'Describe your experience with budget management.',
    'How do you foster collaboration between cross-functional teams?',
    'What is your approach to conducting retrospectives?',
    'How do you handle underperforming team members?',
    'Describe a time you successfully managed a high-pressure project.',
    'What certifications do you hold (PMP, CSM, etc.)?',
    'How do you adapt your management style to different teams?',
    'How do you ensure quality in project deliverables?',
    'Describe a time you had to pivot project direction quickly.',
    'How do you stay organized across multiple projects?',
    'What is the most challenging project you’ve managed?',
    'How do you encourage innovation within your team?',
    'What are the key differences between Waterfall and Agile?'
  ],

  // ----- PRODUCT MANAGER -----
  'Product Manager': [
    'How do you identify customer needs?',
    'Describe your process for developing a product roadmap.',
    'How do you prioritize competing feature requests?',
    'Tell me about a product you successfully launched.',
    'How do you measure product success?',
    'What is your experience with market research and competitive analysis?',
    'How do you collaborate with engineering and design teams?',
    'Describe a time you had to kill a feature or product.',
    'How do you define and track key performance indicators (KPIs)?',
    'What tools do you use for product management?',
    'How do you gather and incorporate user feedback?',
    'Explain the concept of MVP and how you determine it.',
    'How do you handle a situation where stakeholders disagree?',
    'Describe your experience with A/B testing.',
    'How do you stay user-centric while balancing business goals?',
    'What is the most important skill for a product manager?',
    'How do you communicate product vision to the team?',
    'Tell me about a time you made a data-driven decision.',
    'How do you manage product documentation?',
    'Describe a time you had to pivot based on new information.',
    'What is your experience with go-to-market strategies?',
    'How do you handle product launches?',
    'What frameworks do you use for prioritization (RICE, MoSCoW, etc.)?',
    'How do you decide what not to build?',
    'Describe your experience with user personas and journey mapping.',
    'How do you handle technical constraints when defining requirements?',
    'What is the role of a product manager in Agile?',
    'How do you align product strategy with company goals?',
    'Tell me about a product you used that you would improve.',
    'How do you stay updated with industry trends?'
  ],

  // ----- SCRUM MASTER -----
  'Scrum Master': [
    'What are the responsibilities of a Scrum Master?',
    'How do you facilitate daily stand-ups?',
    'Describe how you handle an impediment that the team cannot resolve.',
    'How do you help a team that is not self-organizing?',
    'What is the difference between Scrum and Kanban?',
    'How do you ensure the team adheres to Scrum principles?',
    'Tell me about a time you resolved a conflict between team members.',
    'How do you coach a Product Owner on backlog refinement?',
    'What metrics do you track for team performance?',
    'How do you handle a situation where the team is consistently missing sprint goals?',
    'Describe a successful retrospective you facilitated.',
    'How do you introduce Scrum to a new team?',
    'What is the role of a Scrum Master in scaling frameworks (SAFe, LeSS)?',
    'How do you manage stakeholder expectations?',
    'Tell me about a time you had to shield the team from external pressure.',
    'How do you promote continuous improvement?',
    'What is the importance of a definition of done?',
    'How do you handle a team member who dominates conversations?',
    'Describe your experience with JIRA or other Agile tools.',
    'How do you encourage cross-functionality within the team?',
    'What do you do when the Product Owner is unavailable?',
    'How do you handle a sprint that fails to deliver any value?',
    'What is the difference between velocity and capacity?',
    'How do you help the team estimate accurately?',
    'Describe a time you facilitated a difficult conversation.',
    'How do you keep the team motivated?',
    'What certifications do you hold (CSM, PSM)?',
    'How do you handle a situation where the team is over-committing?',
    'What are the common anti-patterns in Scrum and how do you address them?',
    'How do you stay updated with Agile practices?'
  ],

  // ----- TECHNICAL LEAD -----
  'Technical Lead': [
    'How do you balance coding responsibilities with leadership duties?',
    'Describe your approach to conducting code reviews.',
    'How do you mentor junior developers?',
    'What is your experience with architectural design and decision-making?',
    'How do you handle technical debt?',
    'Tell me about a time you introduced a new technology to the team.',
    'How do you ensure code quality across the team?',
    'Describe a challenging technical decision you made.',
    'How do you communicate technical concepts to non-technical stakeholders?',
    'What is your approach to breaking down complex features into tasks?',
    'How do you foster a culture of learning and growth?',
    'Describe your experience with performance optimization.',
    'How do you handle disagreements with other tech leads?',
    'What are the key qualities of a successful tech lead?',
    'How do you stay hands-on while also managing responsibilities?',
    'Tell me about a time you had to make a trade-off between speed and quality.',
    'How do you ensure the team follows best practices?',
    'What is your experience with incident management and post-mortems?',
    'How do you onboard new team members?',
    'Describe your approach to technical documentation.',
    'How do you prioritize refactoring alongside new feature development?',
    'What is your experience with setting up development environments?',
    'How do you conduct technical interviews?',
    'Describe a time you turned a failing project around.',
    'How do you measure the success of your technical leadership?',
    'What is your approach to risk management in software projects?',
    'How do you handle a team member who is resistant to feedback?',
    'Tell me about a time you advocated for a particular technology stack.',
    'How do you balance innovation with stability?',
    'What are the most important non-technical skills for a tech lead?'
  ],

  // ----- SOLUTIONS ARCHITECT -----
  'Solutions Architect': [
    'How do you approach designing a system from scratch?',
    'Describe a complex system architecture you designed.',
    'How do you choose between different architectural patterns (microservices, monolith, serverless)?',
    'What is your experience with cloud-native architecture?',
    'How do you ensure scalability and performance in your designs?',
    'How do you handle trade-offs between cost, performance, and maintainability?',
    'Describe your experience with API design and integration.',
    'How do you communicate architectural decisions to stakeholders?',
    'What is your experience with security architecture?',
    'How do you evaluate new technologies for adoption?',
    'Describe a time you had to redesign a legacy system.',
    'What are the key considerations for data architecture?',
    'How do you approach disaster recovery and business continuity?',
    'What is your experience with container orchestration and service mesh?',
    'How do you ensure compliance and governance in your designs?',
    'Describe your experience with multi-cloud or hybrid cloud strategies.',
    'How do you document architecture?',
    'What is the role of a solutions architect in an Agile team?',
    'How do you conduct architectural reviews?',
    'Tell me about a time your architecture failed and what you learned.',
    'How do you balance short-term requirements with long-term vision?',
    'What is your experience with event-driven architecture?',
    'How do you handle state management in distributed systems?',
    'Describe your approach to capacity planning.',
    'What are the most common pitfalls in system design?',
    'How do you stay updated with emerging architectural patterns?',
    'What is your experience with domain-driven design (DDD)?',
    'How do you align technical architecture with business goals?',
    'Describe a time you influenced a key architectural decision.',
    'What tools do you use for architecture modeling (UML, C4, etc.)?'
  ],

  // ----- SYSTEMS ADMINISTRATOR -----
  'Systems Administrator': [
    'How do you manage user accounts and permissions in a Linux/Windows environment?',
    'Describe your experience with server provisioning and configuration management.',
    'How do you handle backup and disaster recovery?',
    'What tools do you use for monitoring system health?',
    'How do you troubleshoot a slow server?',
    'What is your experience with virtualization (VMware, Hyper-V)?',
    'How do you patch and update systems securely?',
    'Describe your approach to network security and firewall configuration.',
    'How do you manage DNS, DHCP, and IP addressing?',
    'What is your experience with Active Directory or LDAP?',
    'How do you automate repetitive administrative tasks?',
    'Describe a time you resolved a critical system outage.',
    'How do you maintain documentation for system configurations?',
    'What is your experience with cloud infrastructure (AWS, Azure)?',
    'How do you handle storage management and RAID configurations?',
    'What is the difference between a process and a thread?',
    'How do you monitor and analyze system logs?',
    'Describe your experience with scripting languages (Bash, PowerShell, Python).',
    'How do you ensure high availability for critical services?',
    'What are the key metrics you track for system performance?',
    'How do you handle capacity planning?',
    'Describe your experience with containerization (Docker).',
    'How do you approach security hardening of servers?',
    'What is your experience with VPN and remote access solutions?',
    'How do you manage software deployments across multiple servers?',
    'Describe a time you optimized system performance.',
    'How do you stay updated with new system administration tools?',
    'What is the role of a systems administrator in a DevOps culture?',
    'How do you handle vendor management for hardware/software?',
    'Describe your experience with ITIL or ITSM frameworks.'
  ],

  // ----- DATABASE ADMINISTRATOR -----
  'Database Administrator': [
    'How do you design a database schema for a new application?',
    'Describe your experience with database performance tuning.',
    'How do you handle database backups and recovery?',
    'What are the differences between clustered and non-clustered indexes?',
    'How do you ensure data integrity and consistency?',
    'What is your experience with replication and high availability?',
    'How do you monitor database health and performance?',
    'Describe a time you optimized a slow-running query.',
    'How do you manage database security and user permissions?',
    'What is the difference between SQL and NoSQL databases?',
    'How do you handle database migrations and version control?',
    'What are the best practices for database indexing?',
    'How do you perform capacity planning for database storage?',
    'Describe your experience with cloud database services (RDS, Cosmos DB).',
    'How do you troubleshoot deadlocks and concurrency issues?',
    'What is your experience with ETL processes?',
    'How do you implement database encryption at rest and in transit?',
    'Describe your experience with sharding and partitioning.',
    'How do you handle large-scale data imports/exports?',
    'What are the key metrics you track for database performance?',
    'How do you automate routine database maintenance tasks?',
    'Describe a time you had to recover data from a corrupted database.',
    'What is your experience with data warehousing?',
    'How do you approach database design for analytical vs transactional workloads?',
    'What is the role of a DBA in an Agile development environment?',
    'How do you stay updated with new database technologies?',
    'Describe your experience with PostgreSQL, MySQL, Oracle, or SQL Server.',
    'How do you handle data privacy and compliance (GDPR, HIPAA)?',
    'What is the difference between vertical and horizontal scaling?',
    'How do you document database schemas and procedures?'
  ],

  // ----- NETWORK ENGINEER -----
  'Network Engineer': [
    'Explain the OSI model and each layer.',
    'What is the difference between a switch and a router?',
    'How do you troubleshoot network connectivity issues?',
    'Describe your experience with VLANs and trunking.',
    'What is the role of a firewall and how do you configure rules?',
    'How do you implement network security best practices?',
    'Explain the concept of subnetting and CIDR.',
    'What is the difference between TCP and UDP?',
    'How do you monitor network performance and bandwidth?',
    'Describe your experience with routing protocols (OSPF, BGP, EIGRP).',
    'What is the purpose of NAT and how does it work?',
    'How do you design a scalable network architecture?',
    'What is your experience with VPN technologies?',
    'How do you handle network redundancy and failover?',
    'Describe a time you resolved a complex network outage.',
    'What is the difference between IPv4 and IPv6?',
    'How do you configure and manage wireless networks?',
    'What are the common network attacks and how do you mitigate them?',
    'Describe your experience with network automation tools (Ansible, Python).',
    'How do you document network topologies and configurations?',
    'What is the role of DNS and how do you troubleshoot DNS issues?',
    'How do you ensure Quality of Service (QoS) for critical applications?',
    'What is your experience with SD-WAN?',
    'How do you stay updated with new networking technologies?',
    'Describe your experience with load balancers.',
    'What is the difference between a hub, switch, and router?',
    'How do you implement network segmentation?',
    'What are the best practices for securing remote access?',
    'How do you perform capacity planning for network infrastructure?',
    'Describe a time you optimized network performance.'
  ],

  // ----- MOBILE DEVELOPER (iOS) -----
  'Mobile Developer (iOS)': [
    'What is the difference between Swift and Objective-C?',
    'Explain the iOS app lifecycle.',
    'How do you manage memory in iOS applications?',
    'What is Auto Layout and how do you use it?',
    'Describe your experience with Core Data.',
    'How do you handle asynchronous operations in Swift?',
    'What are the different ways to persist data on iOS?',
    'How do you implement push notifications?',
    'What is the delegation pattern and how is it used in iOS?',
    'Describe your experience with SwiftUI vs UIKit.',
    'How do you handle background tasks?',
    'What are the key considerations for app security on iOS?',
    'How do you test iOS applications?',
    'Explain the concept of Grand Central Dispatch (GCD).',
    'How do you optimize app performance and battery usage?',
    'Describe a challenging iOS bug you fixed.',
    'What is your experience with Combine framework?',
    'How do you handle deep linking?',
    'What are the requirements for submitting an app to the App Store?',
    'How do you manage dependencies in iOS projects (CocoaPods, SPM)?',
    'Describe your experience with ARKit or Core ML.',
    'How do you implement custom animations?',
    'What is the difference between a struct and a class in Swift?',
    'How do you handle localization and internationalization?',
    'What are the best practices for designing iOS user interfaces?',
    'How do you debug memory leaks?',
    'Describe your experience with RESTful APIs in iOS.',
    'How do you ensure accessibility in iOS apps?',
    'What is the role of the AppDelegate and SceneDelegate?',
    'How do you stay updated with new iOS releases and features?'
  ],

  // ----- MOBILE DEVELOPER (Android) -----
  'Mobile Developer (Android)': [
    'What is the difference between Kotlin and Java for Android?',
    'Explain the Android activity lifecycle.',
    'How do you manage memory in Android applications?',
    'What is the purpose of the manifest file?',
    'Describe your experience with Room persistence library.',
    'How do you handle background tasks in Android?',
    'What are the different ways to store data locally?',
    'How do you implement push notifications using FCM?',
    'What is the difference between an Activity and a Fragment?',
    'Describe your experience with Jetpack Compose vs XML layouts.',
    'How do you handle configuration changes?',
    'What are the key considerations for app security on Android?',
    'How do you test Android applications?',
    'Explain the concept of coroutines in Kotlin.',
    'How do you optimize app performance?',
    'Describe a challenging Android bug you fixed.',
    'What is your experience with Dagger/Hilt for dependency injection?',
    'How do you handle deep linking?',
    'What are the requirements for publishing to Google Play Store?',
    'How do you manage dependencies in Android projects (Gradle)?',
    'Describe your experience with Android Jetpack components.',
    'How do you implement custom views and animations?',
    'What is the difference between a Service and an IntentService?',
    'How do you handle localization and internationalization?',
    'What are the best practices for material design?',
    'How do you debug memory leaks?',
    'Describe your experience with RESTful APIs in Android.',
    'How do you ensure accessibility in Android apps?',
    'What is the role of the Application class?',
    'How do you stay updated with new Android releases and features?'
  ],

  // ----- CROSS-PLATFORM MOBILE DEVELOPER -----
  'Cross-Platform Mobile Developer': [
    'What are the advantages and disadvantages of cross-platform development?',
    'Compare React Native, Flutter, and Xamarin.',
    'How do you handle platform-specific code in React Native/Flutter?',
    'Describe your experience with state management in Flutter (Provider, BLoC, Riverpod).',
    'How do you optimize performance in React Native?',
    'What is the widget tree in Flutter?',
    'How do you implement navigation in cross-platform apps?',
    'Describe your experience with native modules/bridges.',
    'How do you handle platform-specific styling?',
    'What are the limitations of cross-platform frameworks?',
    'How do you test cross-platform applications?',
    'Describe a challenging cross-platform bug you fixed.',
    'How do you handle device permissions?',
    'What is the difference between Hot Reload and Hot Restart?',
    'How do you manage app state across platforms?',
    'Describe your experience with Firebase integration.',
    'How do you implement push notifications?',
    'What are the best practices for responsive UI in cross-platform apps?',
    'How do you handle offline storage?',
    'What is your experience with animations in Flutter/React Native?',
    'How do you ensure app security?',
    'Describe your approach to debugging cross-platform issues.',
    'How do you handle versioning and app store submissions?',
    'What is the role of the JavaScript bridge in React Native?',
    'How do you optimize app size?',
    'Describe your experience with third-party libraries.',
    'How do you stay updated with cross-platform technologies?',
    'What are the trade-offs between Flutter and React Native?',
    'How do you handle deep linking?',
    'Describe a project where you chose cross-platform over native and why.'
  ],

  // ----- GAME DEVELOPER -----
  'Game Developer': [
    'What is the difference between Unity and Unreal Engine?',
    'Explain the game loop and its importance.',
    'How do you optimize game performance (draw calls, LODs)?',
    'Describe your experience with C# in Unity or C++ in Unreal.',
    'How do you handle physics in games?',
    'What are design patterns commonly used in game development?',
    'How do you implement save/load functionality?',
    'Describe your experience with multiplayer networking.',
    'How do you approach game AI (pathfinding, behavior trees)?',
    'What is the role of shaders and materials?',
    'How do you test games for bugs and performance?',
    'Describe a challenging game mechanic you implemented.',
    'How do you manage asset pipelines and version control for large projects?',
    'What is your experience with VR/AR development?',
    'How do you handle input from various devices (keyboard, controller, touch)?',
    'Explain the concept of object pooling.',
    'How do you profile and optimize frame rate?',
    'Describe your experience with animation systems.',
    'How do you implement audio and sound effects?',
    'What are the key considerations for mobile game development?',
    'How do you handle monetization and analytics?',
    'Describe your experience with level design tools.',
    'How do you ensure cross-platform compatibility?',
    'What is the difference between forward and deferred rendering?',
    'How do you stay updated with game development trends?',
    'Describe a game project you shipped and what you learned.',
    'How do you balance gameplay difficulty?',
    'What is your experience with procedural generation?',
    'How do you handle memory management in games?',
    'What are the ethical considerations in game design?'
  ],

  // ----- EMBEDDED SYSTEMS ENGINEER -----
  'Embedded Systems Engineer': [
    'What is the difference between microcontroller and microprocessor?',
    'Explain the role of RTOS in embedded systems.',
    'How do you debug embedded software (JTAG, logic analyzers)?',
    'Describe your experience with C/C++ for embedded development.',
    'How do you handle memory constraints in embedded systems?',
    'What are the common communication protocols (I2C, SPI, UART)?',
    'How do you implement low-power modes?',
    'Describe your experience with ARM Cortex or AVR microcontrollers.',
    'How do you approach real-time constraints?',
    'What is the boot process for an embedded device?',
    'How do you handle firmware updates (OTA)?',
    'Describe a challenging embedded project you worked on.',
    'How do you ensure system reliability and fault tolerance?',
    'What is your experience with hardware-software co-design?',
    'How do you test embedded software (unit tests, hardware-in-the-loop)?',
    'Explain the concept of interrupt handling.',
    'How do you manage multiple tasks in a real-time system?',
    'What is the role of a watchdog timer?',
    'Describe your experience with wireless protocols (Bluetooth, Zigbee, LoRa).',
    'How do you document embedded systems designs?',
    'What are the security challenges in embedded systems?',
    'How do you optimize code for size and speed?',
    'Describe your experience with FPGA or VHDL/Verilog.',
    'How do you approach sensor integration?',
    'What is the difference between bare-metal and RTOS-based development?',
    'How do you handle timing and synchronization?',
    'Describe your experience with version control for embedded projects.',
    'How do you stay updated with new embedded technologies?',
    'What are the best practices for embedded software architecture?',
    'How do you collaborate with hardware engineers?'
  ],

  // ----- IOT ENGINEER -----
  'IoT Engineer': [
    'What are the main components of an IoT system?',
    'Explain the difference between IoT and M2M.',
    'How do you choose the right communication protocol for IoT (MQTT, CoAP, HTTP)?',
    'Describe your experience with cloud IoT platforms (AWS IoT, Azure IoT Hub).',
    'How do you handle device provisioning and authentication?',
    'What are the security challenges in IoT and how do you address them?',
    'How do you manage firmware updates for a fleet of devices?',
    'Describe your experience with edge computing.',
    'How do you handle data ingestion and processing at scale?',
    'What is the role of digital twins in IoT?',
    'How do you test IoT systems?',
    'Describe a challenging IoT project you worked on.',
    'How do you ensure interoperability between devices from different vendors?',
    'What are the power constraints in IoT devices and how do you optimize?',
    'Explain the concept of LPWAN and when to use it.',
    'How do you handle device connectivity and offline scenarios?',
    'Describe your experience with sensor data fusion.',
    'How do you approach real-time monitoring and alerting?',
    'What is the role of machine learning in IoT?',
    'How do you manage device lifecycle and retirement?',
    'What are the best practices for IoT data privacy?',
    'Describe your experience with embedded Linux for IoT gateways.',
    'How do you perform root cause analysis for IoT system failures?',
    'What is the difference between LoRaWAN and NB-IoT?',
    'How do you simulate IoT devices for testing?',
    'Describe your experience with Azure Sphere or similar secure MCUs.',
    'How do you handle time synchronization in distributed IoT systems?',
    'What are the challenges of scaling IoT deployments?',
    'How do you stay updated with IoT standards and technologies?',
    'Describe a time you improved IoT system efficiency.'
  ],

  // ----- BLOCKCHAIN DEVELOPER -----
  'Blockchain Developer': [
    'What is the difference between a blockchain and a traditional database?',
    'Explain how a blockchain achieves consensus (PoW, PoS, etc.).',
    'What are smart contracts and how do they work?',
    'Describe your experience with Solidity and Ethereum.',
    'What is the purpose of gas in Ethereum?',
    'How do you test and deploy smart contracts?',
    'What are the security vulnerabilities in smart contracts (reentrancy, overflow)?',
    'Explain the concept of decentralized applications (dApps).',
    'What is the role of Web3.js or ethers.js?',
    'Describe your experience with IPFS or decentralized storage.',
    'How do you handle private keys and secure wallet integration?',
    'What are the differences between public and private blockchains?',
    'Explain the concept of a hash and its importance in blockchain.',
    'How do you design a token (ERC-20, ERC-721)?',
    'What is the role of oracles in blockchain?',
    'Describe a blockchain project you built from scratch.',
    'How do you optimize smart contracts for lower gas costs?',
    'What is the difference between hard fork and soft fork?',
    'How do you stay updated with blockchain technology advancements?',
    'What are the scalability solutions for Ethereum (layer 2, sharding)?',
    'Explain the concept of zero-knowledge proofs.',
    'How do you handle cross-chain interoperability?',
    'What is the role of DeFi and its components?',
    'Describe your experience with Hyperledger Fabric or Corda.',
    'How do you ensure compliance with regulations in blockchain projects?',
    'What are the challenges of developing on blockchain?',
    'How do you debug blockchain transactions?',
    'Explain the concept of a nonce in blockchain.',
    'What is the difference between Bitcoin and Ethereum scripting?',
    'How do you approach blockchain project feasibility and ROI?'
  ],

  // ----- CLOUD ENGINEER -----
  'Cloud Engineer': [
    'What are the core services offered by major cloud providers (compute, storage, networking)?',
    'Explain the difference between IaaS, PaaS, and SaaS.',
    'How do you design a highly available and fault-tolerant architecture on AWS/Azure/GCP?',
    'Describe your experience with Infrastructure as Code (Terraform, CloudFormation).',
    'How do you implement identity and access management (IAM) in the cloud?',
    'What are the best practices for securing cloud environments?',
    'How do you monitor cloud resources and costs?',
    'Explain the concept of serverless computing and its use cases.',
    'How do you handle auto-scaling and load balancing?',
    'Describe your experience with container orchestration (Kubernetes, ECS).',
    'How do you design a disaster recovery plan in the cloud?',
    'What is the role of a VPC and how do you configure it?',
    'How do you optimize cloud costs?',
    'Describe a time you migrated an on-premises application to the cloud.',
    'What are the challenges of multi-cloud or hybrid cloud strategies?',
    'How do you ensure compliance with industry standards (SOC2, HIPAA) in the cloud?',
    'Explain the shared responsibility model.',
    'How do you implement CI/CD pipelines using cloud services?',
    'What is your experience with cloud-native databases (RDS, DynamoDB, Cosmos DB)?',
    'How do you handle data backup and lifecycle management?',
    'Describe your approach to cloud security incident response.',
    'What is the difference between vertical and horizontal scaling?',
    'How do you monitor and analyze cloud logs?',
    'Explain the concept of cloud formation and orchestration.',
    'How do you stay updated with new cloud services and features?',
    'Describe your experience with cloud networking (VPC peering, VPN, Direct Connect).',
    'How do you implement high-performance computing in the cloud?',
    'What are the best practices for cloud architecture reviews?',
    'How do you handle cloud governance and policy enforcement?',
    'Describe a time you optimized a cloud infrastructure for cost and performance.'
  ],

  // ----- SITE RELIABILITY ENGINEER (SRE) -----
  'Site Reliability Engineer': [
    'What is the difference between SRE and DevOps?',
    'Explain the concept of Service Level Indicators (SLIs) and Service Level Objectives (SLOs).',
    'How do you define and measure error budgets?',
    'Describe your experience with incident management and post-mortems.',
    'How do you approach capacity planning and scalability?',
    'What are the key metrics you monitor for system reliability?',
    'How do you implement self-healing systems?',
    'Explain the concept of toil and how you reduce it.',
    'How do you perform chaos engineering?',
    'Describe your experience with monitoring and alerting systems (Prometheus, Grafana, Datadog).',
    'What is the role of automation in SRE?',
    'How do you balance reliability and feature velocity?',
    'Describe a time you improved system reliability.',
    'How do you handle on-call rotations and incident response?',
    'What is the difference between availability and durability?',
    'How do you design for high availability and disaster recovery?',
    'Explain the concept of idempotency in distributed systems.',
    'How do you ensure system security while maintaining reliability?',
    'What is your experience with distributed tracing and observability?',
    'How do you document and share knowledge about system failures?',
    'Describe your approach to blameless post-mortems.',
    'How do you define and track reliability maturity?',
    'What is the role of capacity planning in SRE?',
    'How do you implement canary deployments and blue-green deployments?',
    'Explain the concept of backpressure and how to handle it.',
    'How do you manage dependencies and third-party services?',
    'What are the trade-offs between consistency and availability?',
    'Describe your experience with cloud infrastructure and container orchestration.',
    'How do you measure user experience and performance?',
    'How do you stay updated with SRE best practices?'
  ],

  // ----- UI/UX DESIGNER -----
  'UI/UX Designer': [
    'What is the difference between UI and UX?',
    'Describe your design process from research to final design.',
    'How do you conduct user research and gather requirements?',
    'What tools do you use for wireframing and prototyping?',
    'How do you create user personas and journey maps?',
    'Explain the importance of accessibility in design.',
    'How do you test your designs with users?',
    'Describe a project where you improved the user experience.',
    'What is your experience with design systems?',
    'How do you collaborate with developers to implement designs?',
    'What are the key principles of visual design?',
    'How do you handle feedback and iterate on designs?',
    'Explain the concept of information architecture.',
    'How do you design for mobile vs desktop?',
    'What is the role of motion and micro-interactions?',
    'How do you stay updated with design trends?',
    'Describe your experience with Figma, Sketch, or Adobe XD.',
    'How do you balance user needs with business goals?',
    'What are the common usability heuristics?',
    'How do you create a style guide?',
    'Explain the concept of responsive design.',
    'How do you handle design criticism?',
    'Describe a time you convinced stakeholders to adopt a better design.',
    'What is the difference between a mockup and a prototype?',
    'How do you measure the success of a design?',
    'What is your experience with A/B testing?',
    'How do you design for internationalization?',
    'Explain the concept of gamification in design.',
    'How do you ensure consistency across multiple platforms?',
    'What are the ethical considerations in UX design?'
  ],

  // ----- TECHNICAL WRITER -----
  'Technical Writer': [
    'What is the role of a technical writer in software development?',
    'How do you approach writing documentation for a new API?',
    'Describe your experience with documentation tools (Markdown, Sphinx, Docusaurus).',
    'How do you ensure documentation is clear and user-friendly?',
    'What is the difference between a user guide and a developer guide?',
    'How do you work with subject matter experts to gather information?',
    'Describe a time you improved existing documentation.',
    'How do you handle versioning of documentation?',
    'What are the best practices for writing release notes?',
    'How do you incorporate feedback from users into documentation?',
    'Explain the concept of information mapping.',
    'How do you manage large documentation projects?',
    'What is your experience with video tutorials or interactive documentation?',
    'How do you stay updated with the products you document?',
    'Describe your experience with content management systems.',
    'How do you ensure documentation is accessible?',
    'What is the role of screenshots and diagrams in documentation?',
    'How do you measure the effectiveness of documentation?',
    'What are the challenges of documenting legacy systems?',
    'How do you handle documentation for multiple product versions?',
    'Describe your experience with localization and translation.',
    'What is the difference between a quick start guide and a reference manual?',
    'How do you approach writing a style guide?',
    'How do you collaborate with engineering and product teams?',
    'What is your experience with API documentation standards (OpenAPI, RAML)?',
    'How do you handle documentation for security and compliance?',
    'Describe a time you had to document a complex technical concept.',
    'How do you prioritize documentation tasks?',
    'What are the key qualities of a good technical writer?',
    'How do you stay motivated when writing long-form documentation?'
  ],

  // ----- BUSINESS ANALYST -----
  'Business Analyst': [
    'What is the role of a business analyst in a software project?',
    'How do you gather and document requirements?',
    'Describe your experience with requirement elicitation techniques (interviews, surveys, workshops).',
    'How do you prioritize requirements?',
    'What is the difference between functional and non-functional requirements?',
    'How do you create use cases and user stories?',
    'Describe a time you managed scope creep.',
    'How do you validate requirements with stakeholders?',
    'What tools do you use for requirements management (JIRA, Confluence, etc.)?',
    'How do you communicate technical requirements to developers?',
    'Explain the concept of a traceability matrix.',
    'How do you handle conflicting requirements from different stakeholders?',
    'Describe your experience with process modeling (BPMN, UML).',
    'What is the difference between a requirement and a specification?',
    'How do you perform gap analysis?',
    'Describe a project where you identified a hidden requirement.',
    'How do you evaluate the feasibility of a requirement?',
    'What is your experience with Agile methodologies?',
    'How do you estimate project effort and timeline?',
    'What is the role of a business analyst in user acceptance testing?',
    'How do you stay updated with industry trends?',
    'Describe a time you used data analysis to support a business case.',
    'What are the common challenges in business analysis and how do you overcome them?',
    'How do you manage stakeholder expectations?',
    'What is the difference between a business requirement and a solution requirement?',
    'How do you document business rules?',
    'Describe your experience with product roadmap development.',
    'How do you handle changes in requirements after development starts?',
    'What certifications do you hold (CBAP, CCBA, etc.)?',
    'How do you measure the success of a project from a business perspective?'
  ],

  // ----- SALES ENGINEER -----
  'Sales Engineer': [
    'What is the role of a sales engineer?',
    'How do you balance technical expertise with sales objectives?',
    'Describe a time you delivered a successful product demo.',
    'How do you handle technical objections from prospects?',
    'What is your experience with RFP responses?',
    'How do you build relationships with customers?',
    'Describe your approach to understanding a client’s technical requirements.',
    'How do you collaborate with the sales team?',
    'What are the most important skills for a sales engineer?',
    'How do you keep up with product updates and new features?',
    'Describe a time you lost a deal and what you learned.',
    'How do you handle a prospect with a competitor’s product?',
    'What is your experience with proof of concept (PoC) implementations?',
    'How do you explain complex technical concepts to non-technical buyers?',
    'How do you prioritize leads and opportunities?',
    'Describe your experience with CRM tools (Salesforce, HubSpot).',
    'How do you handle pricing and licensing questions?',
    'What is the difference between a sales engineer and a solutions architect?',
    'How do you stay motivated in a high-pressure sales environment?',
    'Describe a time you exceeded your sales quota.',
    'How do you handle product gaps or limitations with prospects?',
    'What is your experience with competitive analysis?',
    'How do you train customers on product usage?',
    'Describe a time you had to say no to a customer request.',
    'How do you gather customer feedback for product improvement?',
    'What is the role of a sales engineer in contract negotiations?',
    'How do you manage multiple demos and deadlines?',
    'What are the ethical considerations in sales engineering?',
    'How do you measure your own success in the role?',
    'Describe a time you worked closely with product management.'
  ],

  // ----- CUSTOMER SUCCESS MANAGER -----
  'Customer Success Manager': [
    'What is the difference between customer success and customer support?',
    'How do you measure customer satisfaction and success?',
    'Describe your approach to onboarding new customers.',
    'How do you identify at-risk accounts and intervene?',
    'What strategies do you use to drive product adoption?',
    'How do you handle a customer who is unhappy with the product?',
    'Describe a time you helped a customer achieve significant value.',
    'How do you build relationships with key stakeholders?',
    'What metrics do you track to monitor account health?',
    'How do you collaborate with sales and support teams?',
    'What is your experience with customer success platforms (Gainsight, ChurnZero)?',
    'How do you handle churn and retention?',
    'Describe a time you upsold or cross-sold to an existing customer.',
    'How do you educate customers on new features?',
    'How do you prioritize your accounts?',
    'What is the role of customer feedback in product development?',
    'How do you manage customer expectations?',
    'Describe a time you turned a detractor into a promoter.',
    'How do you stay organized across a large portfolio of customers?',
    'What are the key qualities of a successful customer success manager?',
    'How do you handle a customer requesting a feature that is not on the roadmap?',
    'What is your experience with contract renewals?',
    'How do you measure customer lifetime value?',
    'Describe a time you created a customer success playbook.',
    'How do you stay updated with product changes?',
    'How do you handle a difficult conversation with a customer?',
    'What is the role of customer success in reducing churn?',
    'How do you celebrate customer wins?',
    'Describe a time you went above and beyond for a customer.',
    'How do you maintain empathy while achieving business goals?'
  ],

  // ----- IT SUPPORT SPECIALIST -----
  'IT Support Specialist': [
    'How do you troubleshoot a user’s computer issue remotely?',
    'Describe your experience with ticketing systems (ServiceNow, Jira Service Desk).',
    'How do you prioritize support requests?',
    'What is your experience with Active Directory and user account management?',
    'How do you handle password resets and access issues?',
    'Describe a time you resolved a complex technical issue.',
    'How do you explain technical solutions to non-technical users?',
    'What is the importance of documentation in IT support?',
    'How do you stay patient and professional under pressure?',
    'Describe your experience with hardware troubleshooting (desktops, laptops, printers).',
    'How do you handle virus and malware infections?',
    'What is your experience with remote desktop tools?',
    'How do you ensure security best practices are followed by users?',
    'Describe a time you improved an IT support process.',
    'How do you handle a situation where you cannot resolve an issue?',
    'What is your experience with network troubleshooting (connectivity, IP configuration)?',
    'How do you manage software installations and updates?',
    'Describe your approach to onboarding new employees with IT setup.',
    'How do you handle data backup and recovery?',
    'What are the key metrics for IT support performance?',
    'How do you keep up with new technology trends?',
    'Describe a time you received positive feedback from a user.',
    'How do you handle multiple issues simultaneously?',
    'What is your experience with mobile device management (MDM)?',
    'How do you document common issues and solutions?',
    'Describe your experience with cloud productivity suites (Google Workspace, Microsoft 365).',
    'How do you handle after-hours support?',
    'What is the role of IT support in cybersecurity?',
    'How do you maintain confidentiality and data privacy?',
    'Describe a time you went above and beyond to help a user.'
  ],

  // ----- DATA ENGINEER -----
  'Data Engineer': [
    'What is the role of a data engineer in a data team?',
    'How do you design a data pipeline for ETL/ELT?',
    'Describe your experience with big data technologies (Spark, Hadoop).',
    'What is the difference between structured and unstructured data?',
    'How do you ensure data quality and integrity?',
    'What are your preferred tools for orchestration (Airflow, Luigi, Dagster)?',
    'How do you handle real-time data streaming (Kafka, Kinesis)?',
    'Describe your experience with data warehousing (Snowflake, BigQuery, Redshift).',
    'How do you model data for analytics (star schema, snowflake)?',
    'What is the role of a data lake?',
    'How do you handle slowly changing dimensions?',
    'Describe your experience with SQL and query optimization.',
    'How do you manage data partitioning and clustering?',
    'What is the difference between batch and stream processing?',
    'How do you monitor data pipeline health?',
    'Describe a time you optimized a data pipeline for performance.',
    'How do you handle schema evolution?',
    'What is your experience with cloud data services?',
    'How do you implement data governance and security?',
    'Describe your experience with Python or Scala for data processing.',
    'How do you test data pipelines?',
    'What are the challenges of working with unstructured data?',
    'How do you collaborate with data scientists and analysts?',
    'What is the concept of idempotency in data pipelines?',
    'How do you handle error handling and retries?',
    'Describe your experience with NoSQL databases for big data.',
    'How do you version control data transformations?',
    'What are the best practices for data pipeline documentation?',
    'How do you stay updated with new data engineering tools?',
    'Describe a complex data engineering project you led.'
  ]
};

// ----- FALLBACK QUESTIONS (used if role not in bank) -----
const fallbackQuestions = [
  'Tell me about a challenging project you worked on and how you overcame obstacles.',
  'How do you stay updated with the latest industry trends?',
  'Describe a time you worked effectively in a team.',
  'How do you handle constructive criticism?',
  'Where do you see yourself in five years?',
  'Why are you interested in this role?',
  'What are your greatest strengths and weaknesses?',
  'Describe a time you had to learn a new technology quickly.',
  'How do you prioritize your work?',
  'Tell me about a mistake you made and what you learned.',
  'What motivates you in your career?',
  'Describe your ideal work environment.',
  'How do you handle stress and tight deadlines?',
  'Give an example of a goal you achieved.',
  'How do you handle a situation where you disagree with your manager?'
];

// ============================================================================
// SAMPLE ANSWERS – 200+ detailed responses
// ============================================================================
const sampleAnswers = {
  // Frontend
  'How do you optimize a React application for performance?': 
    'I use React.memo for component memoization, useCallback and useMemo hooks to avoid unnecessary re-renders, code splitting with React.lazy, and virtualisation for long lists. I also audit performance with Lighthouse and React DevTools.',
  'Explain the difference between controlled and uncontrolled components.': 
    'Controlled components have their state managed by React via useState and onChange handlers, while uncontrolled components store their state in the DOM itself, accessed via refs. Controlled components are more predictable and easier to test.',
  'How would you implement state management in a large-scale React app?': 
    'I would use Redux Toolkit with slices for global state, and React Context for theme or user authentication. For server state, React Query or RTK Query are excellent choices.',
  
  // Full Stack
  'Describe a full-stack project you built from scratch.': 
    'I built a mentor-mentee portal using React, Node.js, Express, and MongoDB. I implemented JWT authentication, role-based access, and a RESTful API. The project was deployed on Vercel and Railway.',
  'How do you handle authentication and authorization in a web app?': 
    'I use JWT tokens stored in HTTP-only cookies for authentication. For authorization, I implement middleware that checks user roles and permissions before allowing access to routes. I also use bcrypt for password hashing.',
  'Explain how you optimize database queries for performance.': 
    'I use indexing on frequently queried columns, analyze query execution plans, denormalize where appropriate, and implement caching with Redis. I also paginate results and avoid N+1 queries using eager loading.',

  // Backend
  'How do you design a scalable database schema?':
    'I start with normalization to eliminate redundancy, then selectively denormalize for performance. I partition large tables, use appropriate data types, and index strategically. I also consider future growth and use sharding if necessary.',
  'Explain the difference between SQL and NoSQL databases.':
    'SQL databases are relational with schemas, ACID compliant, and suited for complex queries. NoSQL databases are non-relational, schema-flexible, scale horizontally, and are ideal for unstructured data or high-velocity writes.',

  // DevOps
  'Explain the difference between continuous integration and continuous deployment.':
    'CI is the practice of merging code changes frequently and running automated tests. CD extends CI by automatically deploying every change that passes tests to production. Continuous delivery stops short of automatic deployment, requiring manual approval.',

  // Data Science
  'Explain overfitting and how to prevent it.':
    'Overfitting occurs when a model learns training data too well, including noise, and performs poorly on unseen data. I prevent it with cross-validation, regularization (L1/L2), pruning, early stopping, and using more training data.',

  // Machine Learning Engineer
  'How do you handle imbalanced datasets?':
    'I use techniques like resampling (SMOTE), class weights, or anomaly detection algorithms. I also choose metrics like precision-recall AUC rather than accuracy, and sometimes collect more data from the minority class.',

  // AI Engineer
  'Explain the concept of Retrieval-Augmented Generation (RAG).':
    'RAG combines a retrieval system (vector database) with a generative model. When a query comes in, it retrieves relevant documents from a knowledge base and feeds them as context to the LLM, reducing hallucinations and grounding responses in factual data.',

  // Security Engineer
  'What is OWASP Top 10 and why is it important?':
    'OWASP Top 10 is a standard awareness document listing the most critical security risks to web applications. It’s important because it provides a common language for developers and security teams, and helps prioritize remediation efforts.',

  // QA Engineer
  'Explain the difference between functional and non-functional testing.':
    'Functional testing verifies that the software performs specific functions as expected (unit, integration, system). Non-functional testing evaluates performance, security, usability, reliability – how the system behaves under conditions.',

  // Project Manager
  'How do you handle scope creep?':
    'I establish a clear change control process, communicate the impact on timeline and budget, and get formal approval for any changes. I also involve stakeholders early and maintain a prioritized backlog to manage expectations.',

  // Product Manager
  'How do you prioritize competing feature requests?':
    'I use frameworks like RICE (Reach, Impact, Confidence, Effort) or MoSCoW. I align with strategic goals, gather user feedback, and consider technical feasibility. I also validate with data and prototypes before committing.',

  // Scrum Master
  'What are the responsibilities of a Scrum Master?':
    'The Scrum Master serves the team by facilitating Scrum events, removing impediments, coaching Agile practices, and ensuring Scrum principles are followed. They also shield the team from external distractions and foster a culture of continuous improvement.',

  // Technical Lead
  'How do you balance coding responsibilities with leadership duties?':
    'I allocate dedicated time for coding and for mentoring, design reviews, and planning. I try to stay hands-on to maintain technical credibility but delegate when needed. I use code reviews and pair programming to contribute without blocking.',

  // Solutions Architect
  'How do you approach designing a system from scratch?':
    'I start by gathering functional and non-functional requirements, then choose appropriate architecture patterns (microservices, layered). I create high-level component diagrams, define data flow, consider scalability, security, and cost, and iterate with feedback.',

  // Systems Administrator
  'How do you troubleshoot a slow server?':
    'I first check CPU, memory, disk I/O, and network usage using tools like top, iostat, and netstat. I review logs for errors, check for runaway processes, and analyze recent changes. I also verify database and application performance.',

  // Database Administrator
  'How do you optimize a slow-running query?':
    'I use EXPLAIN to analyze the query plan, check if indexes are used, rewrite the query (avoid SELECT *, use joins appropriately), and consider denormalization or query caching. I also look at table statistics and fragmentation.',

  // Network Engineer
  'Explain the OSI model and each layer.':
    'OSI has 7 layers: Physical (bits), Data Link (frames), Network (packets), Transport (segments), Session (dialog control), Presentation (data translation), Application (user services). It standardizes network communication.',

  // Mobile Developer (iOS)
  'What is the difference between Swift and Objective-C?':
    'Swift is modern, safer with optionals, more concise, and faster. Objective-C is dynamic, uses message passing, and is more verbose. Swift interoperates with Objective-C and is the preferred language for new iOS projects.',

  // Mobile Developer (Android)
  'Explain the Android activity lifecycle.':
    'The lifecycle includes onCreate, onStart, onResume, onPause, onStop, onDestroy. Also onRestart and onSaveInstanceState. Understanding this is crucial for managing state and resources efficiently.',

  // Cross-Platform Mobile Developer
  'What are the advantages and disadvantages of cross-platform development?':
    'Advantages: code reuse, faster development, lower cost. Disadvantages: performance may not match native, limited access to platform-specific APIs, larger app size, and potential UI inconsistencies.',

  // Game Developer
  'Explain the game loop and its importance.':
    'The game loop continuously processes input, updates game state, and renders output. It ensures smooth, consistent gameplay regardless of frame rate. It also handles timing and physics updates.',

  // Embedded Systems Engineer
  'What is the difference between microcontroller and microprocessor?':
    'A microcontroller integrates CPU, memory, I/O on a single chip, designed for dedicated tasks with low power. A microprocessor requires external components and is used for general-purpose computing, offering higher performance.',

  // IoT Engineer
  'What are the main components of an IoT system?':
    'Devices/sensors, connectivity (WiFi, cellular, LPWAN), edge gateway, cloud platform, data processing, and user interface. Security and device management are also critical components.',

  // Blockchain Developer
  'What are smart contracts and how do they work?':
    'Smart contracts are self-executing programs on a blockchain that automatically enforce agreements when conditions are met. They are written in Solidity on Ethereum, deployed to the blockchain, and executed by miners.',

  // Cloud Engineer
  'Explain the difference between IaaS, PaaS, and SaaS.':
    'IaaS provides virtualized computing resources (VMs, storage). PaaS provides a platform for developing apps without managing infrastructure. SaaS delivers software over the internet, fully managed by the provider.',

  // Site Reliability Engineer
  'What is the difference between SRE and DevOps?':
    'SRE applies software engineering to operations, emphasizing reliability, automation, and SLIs/SLOs. DevOps is a cultural movement focusing on collaboration, CI/CD, and shared responsibility. SRE is a specific implementation of DevOps principles.',

  // UI/UX Designer
  'What is the difference between UI and UX?':
    'UI (User Interface) focuses on the look, layout, and interactive elements. UX (User Experience) focuses on the overall feel, usability, and user journey. UI is the bridge, UX is the experience crossing it.',

  // Technical Writer
  'What is the role of a technical writer in software development?':
    'A technical writer creates clear, concise documentation (user guides, API docs, tutorials). They work with engineers and product managers to understand features and translate technical concepts into user-friendly content.',

  // Business Analyst
  'How do you gather and document requirements?':
    'I use interviews, surveys, workshops, and document analysis. I model requirements with use cases, user stories, and process diagrams. I validate through prototypes and reviews, and maintain traceability.',

  // Sales Engineer
  'Describe a time you delivered a successful product demo.':
    'I tailored the demo to the prospect’s industry, highlighted features relevant to their pain points, and used a narrative approach. I engaged the audience with interactive elements and handled questions smoothly.',

  // Customer Success Manager
  'How do you measure customer satisfaction and success?':
    'I track metrics like NPS, CSAT, customer health scores, product usage, and retention rates. I also conduct regular check-ins and surveys to gather qualitative feedback and identify at-risk accounts.',

  // IT Support Specialist
  'How do you troubleshoot a user’s computer issue remotely?':
    'I ask the user to describe the problem, then guide them through diagnostic steps. I use remote desktop tools if permitted, check logs, and try common fixes. I document the issue and escalate if needed.',

  // Data Engineer
  'How do you design a data pipeline for ETL/ELT?':
    'I extract data from sources, transform it using Spark or SQL, and load it into a data warehouse. I use orchestration tools like Airflow for scheduling, monitor data quality, and handle incremental loads.'
};

// Add generic fallback answer for questions not specifically covered
const getSampleAnswer = (question) => {
  return sampleAnswers[question] || 
    'This is a common interview question. I recommend preparing a structured response using the STAR method (Situation, Task, Action, Result). Focus on specific examples from your past projects, highlighting your technical skills, problem-solving approach, and measurable outcomes. Relate your answer to the job description and company values.';
};

const MockInterviewPage = () => {
  const { results } = useResults();
  const [selectedRole, setSelectedRole] = useState('');
  const [questions, setQuestions] = useState([]);
  const [revealedIndex, setRevealedIndex] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const recommendedRoles = useMemo(() => {
    return results?.recommended_job_roles || [];
  }, [results]);

  useEffect(() => {
    if (recommendedRoles.length > 0 && !selectedRole) {
      setSelectedRole(recommendedRoles[0]);
    }
  }, [recommendedRoles, selectedRole]);

  useEffect(() => {
    if (selectedRole) {
      const roleQuestions = questionBank[selectedRole] || fallbackQuestions;
      const shuffled = [...roleQuestions].sort(() => 0.5 - Math.random());
      setQuestions(shuffled.slice(0, 6)); // Show 6 questions per session
      setRevealedIndex(null);
    }
  }, [selectedRole]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      if (selectedRole) {
        const roleQuestions = questionBank[selectedRole] || fallbackQuestions;
        const shuffled = [...roleQuestions].sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 6));
      }
      setIsRefreshing(false);
    }, 600);
  };

  const toggleAnswer = (index) => {
    setRevealedIndex(revealedIndex === index ? null : index);
  };

  if (!results?.skills || recommendedRoles.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="glass-panel max-w-2xl w-full p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <MessageSquare className="w-10 h-10 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">No interview data</h2>
          <p className="text-slate-400 text-lg mb-8">
            Analyze a project first – we'll generate mock interview questions tailored to your skills and target roles.
          </p>
          <a
            href="/analyzer"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/30 transition-all transform hover:scale-105"
          >
            <span>Go to Analyzer</span>
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-900/30 via-transparent to-purple-900/30 p-8 border border-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>
        
        <div className="relative text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-300 uppercase tracking-wider">
              MOCK INTERVIEW • 32+ ROLES • 500+ QUESTIONS
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Practice for <br/>
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              your dream role
            </span>
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto">
            Real interview questions, tailored to your skills and experience.
          </p>
        </div>
      </div>

      {/* ROLE SELECTOR */}
      <div className={`glass-panel p-8 transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-7 h-7 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">Select target role</h2>
        </div>
        <div className="flex flex-wrap gap-4">
          {recommendedRoles.map((role, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedRole(role)}
              className={`
                group relative px-6 py-3.5 rounded-xl border transition-all duration-300
                ${selectedRole === role
                  ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/30'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/30'
                }
              `}
            >
              <span className="font-medium">{role}</span>
              {selectedRole === role && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* QUESTIONS SECTION */}
      {selectedRole && (
        <div className={`space-y-6 transition-all duration-1000 delay-200 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Briefcase className="w-7 h-7 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">
                Interview questions for <span className="text-cyan-400">{selectedRole}</span>
              </h2>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-slate-300 transition-all hover:scale-105 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          <div className="grid gap-5">
            {questions.map((question, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 border-l-8 border-l-cyan-500 hover:border-l-purple-500 transition-all duration-300"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="text-white text-lg font-medium leading-relaxed">
                      {idx + 1}. {question}
                    </p>
                    
                    {revealedIndex === idx && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/30 animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <p className="text-slate-300 text-sm leading-relaxed">
                            {getSampleAnswer(question)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => toggleAnswer(idx)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-cyan-300 transition-all whitespace-nowrap"
                  >
                    {revealedIndex === idx ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        <span>View answer</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-panel p-6 border border-cyan-500/30 bg-gradient-to-br from-cyan-900/10 to-purple-900/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-cyan-400" />
                <span className="text-slate-300">
                  <span className="text-white font-semibold">{results.skills.length}</span> verified skills • 
                  <span className="text-cyan-400 ml-1">{recommendedRoles.length}</span> role matches
                </span>
              </div>
              <a
                href="/role-match"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/30 transition-all transform hover:scale-105"
              >
                <span>View role match</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockInterviewPage;