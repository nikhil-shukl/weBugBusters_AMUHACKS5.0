export const jobRoleSkills = {
  // ----- CORE DEVELOPMENT ROLES -----
  'Frontend Developer': [
    'React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind', 'Vue.js',
    'Angular', 'Redux', 'Next.js', 'Webpack', 'Responsive Design', 'UI/UX Design',
    'Jest', 'Cypress', 'GraphQL', 'REST APIs'
  ],
  'Full Stack Developer': [
    'React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'JavaScript',
    'TypeScript', 'Python', 'Django', 'Flask', 'REST APIs', 'GraphQL',
    'Docker', 'AWS', 'Git', 'CI/CD', 'Tailwind', 'Prisma'
  ],
  'Backend Developer': [
    'Node.js', 'Express', 'Python', 'Django', 'Flask', 'Java', 'Spring Boot',
    'C#', '.NET', 'Go', 'Rust', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis',
    'REST APIs', 'GraphQL', 'Microservices', 'Docker', 'Kubernetes', 'AWS',
    'Serverless', 'RabbitMQ', 'Kafka'
  ],
  'UI Developer': [
    'HTML', 'CSS', 'JavaScript', 'React', 'Vue.js', 'Tailwind', 'Sass',
    'Figma', 'Adobe XD', 'Responsive Design', 'Accessibility', 'UI/UX Design',
    'Animation', 'Storybook'
  ],
  'Mobile Developer (iOS)': [
    'Swift', 'SwiftUI', 'UIKit', 'iOS SDK', 'Xcode', 'Core Data', 'REST APIs',
    'Firebase', 'Combine', 'ARKit'
  ],
  'Mobile Developer (Android)': [
    'Kotlin', 'Java', 'Android SDK', 'Jetpack Compose', 'Room', 'Firebase',
    'REST APIs', 'Gradle', 'Material Design'
  ],
  'Cross‑Platform Mobile Developer': [
    'React Native', 'Flutter', 'Dart', 'JavaScript', 'Redux', 'Firebase',
    'REST APIs', 'Mobile UI/UX'
  ],
  'Game Developer': [
    'Unity', 'C#', 'Unreal Engine', 'C++', 'Blueprints', '3D Mathematics',
    'Physics', 'Shader', 'Multiplayer Networking'
  ],

  // ----- DEVOPS & CLOUD -----
  'DevOps Engineer': [
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Terraform', 'Ansible',
    'Jenkins', 'GitHub Actions', 'GitLab CI', 'Linux', 'Bash', 'Python',
    'Prometheus', 'Grafana', 'ELK Stack', 'Helm'
  ],
  'Cloud Engineer': [
    'AWS', 'Azure', 'GCP', 'Terraform', 'CloudFormation', 'Kubernetes',
    'Docker', 'Serverless', 'Lambda', 'VPC', 'IAM', 'S3', 'RDS', 'CloudWatch'
  ],
  'Site Reliability Engineer': [
    'Kubernetes', 'Docker', 'Prometheus', 'Grafana', 'Linux', 'Python', 'Go',
    'Terraform', 'AWS', 'CI/CD', 'Incident Management', 'SLI/SLO'
  ],
  'Platform Engineer': [
    'Kubernetes', 'Docker', 'AWS', 'Terraform', 'Crossplane', 'Backstage',
    'CNCF', 'Service Mesh', 'Istio', 'Linkerd', 'Argo CD'
  ],

  // ----- DATA & AI -----
  'Data Scientist': [
    'Python', 'R', 'Pandas', 'NumPy', 'Scikit‑learn', 'TensorFlow', 'PyTorch',
    'SQL', 'Tableau', 'Power BI', 'Matplotlib', 'Seaborn', 'Statistics',
    'Machine Learning', 'Deep Learning', 'NLP', 'Big Data'
  ],
  'Machine Learning Engineer': [
    'Python', 'TensorFlow', 'PyTorch', 'Scikit‑learn', 'Keras', 'OpenCV',
    'NLP', 'Transformers', 'ONNX', 'Docker', 'Kubernetes', 'MLflow',
    'AWS SageMaker', 'GCP AI Platform'
  ],
  'Data Engineer': [
    'Python', 'SQL', 'Spark', 'Hadoop', 'Airflow', 'Kafka', 'AWS Glue',
    'ETL', 'Data Warehousing', 'Snowflake', 'BigQuery', 'dbt', 'Databricks'
  ],
  'Data Analyst': [
    'SQL', 'Excel', 'Python', 'Pandas', 'Tableau', 'Power BI', 'Looker',
    'Statistics', 'Data Visualization', 'A/B Testing'
  ],
  'AI Engineer': [
    'Python', 'TensorFlow', 'PyTorch', 'LangChain', 'LlamaIndex', 'OpenAI API',
    'RAG', 'Vector Databases', 'ChromaDB', 'Pinecone', 'Hugging Face'
  ],

  // ----- SECURITY -----
  'Security Engineer': [
    'Network Security', 'Penetration Testing', 'Kali Linux', 'Wireshark',
    'Metasploit', 'Burp Suite', 'Firewalls', 'SIEM', 'Python', 'Bash',
    'CISSP', 'Certified Ethical Hacker'
  ],
  'Application Security Engineer': [
    'OWASP Top 10', 'SAST', 'DAST', 'Burp Suite', 'Threat Modeling',
    'Secure Code Review', 'Penetration Testing', 'DevSecOps', 'Kubernetes Security'
  ],
  'Security Analyst': [
    'SIEM', 'Incident Response', 'Splunk', 'Wireshark', 'Nmap', 'Firewalls',
    'VPN', 'IDS/IPS', 'GDPR', 'ISO 27001'
  ],

  // ----- DATABASE & INFRASTRUCTURE -----
  'Database Administrator': [
    'MySQL', 'PostgreSQL', 'Oracle', 'SQL Server', 'MongoDB', 'Redis',
    'Cassandra', 'Database Design', 'Query Optimization', 'Replication',
    'Backup & Recovery', 'Performance Tuning'
  ],
  'Systems Administrator': [
    'Linux', 'Windows Server', 'Bash', 'PowerShell', 'Networking', 'Virtualization',
    'VMware', 'Hyper‑V', 'Active Directory', 'AWS', 'Azure'
  ],

  // ----- QA & TESTING -----
  'Software Tester': [
    'Manual Testing', 'Jest', 'Cypress', 'Selenium', 'TestNG', 'JUnit',
    'Postman', 'REST Assured', 'Bug Tracking', 'JIRA', 'Agile'
  ],
  'QA Engineer': [
    'Test Automation', 'Selenium', 'Cypress', 'Playwright', 'Appium',
    'JUnit', 'TestNG', 'Python', 'JavaScript', 'CI/CD', 'Performance Testing',
    'JMeter', 'LoadRunner'
  ],

  // ----- MANAGEMENT & PRODUCT -----
  'Project Manager': [
    'Agile', 'Scrum', 'Kanban', 'JIRA', 'Confluence', 'Risk Management',
    'Stakeholder Management', 'Budgeting', 'SDLC', 'MS Project', 'PMP'
  ],
  'Product Manager': [
    'Product Strategy', 'Market Research', 'User Stories', 'Roadmapping',
    'A/B Testing', 'Analytics', 'Competitive Analysis', 'Wireframing',
    'Figma', 'JIRA', 'Agile'
  ],
  'Technical Product Manager': [
    'APIs', 'Cloud', 'Agile', 'User Stories', 'Backlog Grooming',
    'Technical Documentation', 'SQL', 'Analytics', 'Stakeholder Management'
  ],
  'Scrum Master': [
    'Scrum', 'Agile', 'JIRA', 'Confluence', 'Facilitation', 'Coaching',
    'Conflict Resolution', 'Sprint Planning', 'Retrospectives'
  ],
  'Technical Lead': [
    'System Architecture', 'Code Review', 'Mentoring', 'Technical Design',
    'Microservices', 'Cloud', 'Agile', 'Team Leadership'
  ],
  'Engineering Manager': [
    'Team Leadership', 'Performance Reviews', 'Hiring', 'Mentoring',
    'Agile', 'Project Planning', 'Budgeting', 'Technical Strategy'
  ],

  // ----- DESIGN & UX -----
  'UX Designer': [
    'User Research', 'Wireframing', 'Prototyping', 'Figma', 'Sketch',
    'Adobe XD', 'Usability Testing', 'Information Architecture',
    'Personas', 'User Flows', 'Accessibility'
  ],
  'UI Designer': [
    'Visual Design', 'Typography', 'Color Theory', 'Figma', 'Sketch',
    'Adobe Creative Suite', 'Responsive Design', 'Design Systems'
  ],
  'Product Designer': [
    'UI/UX Design', 'User Research', 'Wireframing', 'Prototyping', 'Figma',
    'Design Systems', 'Usability Testing', 'Interaction Design'
  ],

  // ----- TECHNICAL WRITING & CONTENT -----
  'Technical Writer': [
    'Technical Documentation', 'API Documentation', 'User Guides',
    'Markdown', 'Git', 'DITA', 'MadCap Flare', 'Confluence', 'JIRA'
  ],
  'Content Writer': [
    'SEO', 'Copywriting', 'Blogging', 'Content Strategy', 'WordPress',
    'Grammar', 'Editing', 'Storytelling', 'Social Media'
  ],

  // ----- EMERGING & SPECIALIZED -----
  'Blockchain Developer': [
    'Solidity', 'Ethereum', 'Web3.js', 'Smart Contracts', 'Truffle',
    'Hardhat', 'IPFS', 'Cryptography', 'DeFi', 'NFT'
  ],
  'AR/VR Developer': [
    'Unity', 'Unreal Engine', 'C#', 'C++', 'ARKit', 'ARCore', 'WebXR',
    '3D Modeling', 'Spatial Computing'
  ],
  'Embedded Systems Engineer': [
    'C', 'C++', 'Embedded Linux', 'RTOS', 'ARM', 'Microcontrollers',
    'I2C', 'SPI', 'UART', 'IoT', 'Zigbee', 'BLE'
  ],
  'IoT Engineer': [
    'C++', 'Python', 'MQTT', 'CoAP', 'AWS IoT', 'Azure IoT', 'ESP32',
    'Arduino', 'Raspberry Pi', 'LoRaWAN', 'Sensors'
  ],
  'Robotics Engineer': [
    'ROS', 'C++', 'Python', 'Gazebo', 'OpenCV', 'SLAM', 'Control Systems',
    'Kinematics', 'Mechanical Design'
  ],

  // ----- LEGACY / ADDITIONAL -----
  'Systems Architect': [
    'System Design', 'Microservices', 'Cloud Architecture', 'Distributed Systems',
    'Scalability', 'Security', 'DevOps', 'TOGAF', 'UML'
  ],
  'Solutions Architect': [
    'Solution Design', 'Cloud (AWS/Azure/GCP)', 'Integration', 'Pre‑Sales',
    'Technical Presentations', 'API Design', 'Enterprise Architecture'
  ]
};