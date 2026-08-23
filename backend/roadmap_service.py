from roadmap import roadmaps


aliases = {
    "Cloud Platforms (AWS/GCP/Azure)": ["AWS", "Azure", "GCP"],
    "AWS / Cloud Deployment": ["AWS"],
    "Cloud Deployment": ["AWS"],

    "NoSQL Databases (MongoDB/PostgreSQL)": ["MongoDB", "PostgreSQL"],
    "NoSQL (MongoDB)": ["MongoDB"],

    "CI/CD Pipelines": ["CI/CD"],
    "CI CD": ["CI/CD"],

    "React.js": ["React"],
    "ReactJS": ["React"],

    "NodeJS": ["Node.js"],
    "Node": ["Node.js"],

    "JS": ["JavaScript"],

    "Python Programming": ["Python"],

    "HTML5": ["HTML"],
    "CSS3": ["CSS"],

    "Machine Learning (ML)": ["Machine Learning"],
    "Deep Learning (DL)": ["Deep Learning"],

    "Artificial Intelligence": ["Machine Learning"],

    "Cyber Security": ["Cybersecurity"],

    "Penetration Testing": ["Ethical Hacking"],

    "PowerBI": ["Power BI"],

    "Data Structures & Algorithms": [
        "Data Structures",
        "Algorithms"
    ],

    "DSA": [
        "Data Structures",
        "Algorithms"
    ]
}


def generate_roadmap(missing_skills):

    result = []
    added = set()

    for skill in missing_skills:

        skill = skill.strip()

        # Exact Match
        if skill in roadmaps:

            if skill not in added:

                result.append({
                    "skill": skill,
                    "beginner": roadmaps[skill]["beginner"],
                    "intermediate": roadmaps[skill]["intermediate"],
                    "advanced": roadmaps[skill]["advanced"]
                })

                added.add(skill)

            continue

        # Alias Match
        if skill in aliases:

            for actual_skill in aliases[skill]:

                if actual_skill in roadmaps and actual_skill not in added:

                    result.append({
                        "skill": actual_skill,
                        "beginner": roadmaps[actual_skill]["beginner"],
                        "intermediate": roadmaps[actual_skill]["intermediate"],
                        "advanced": roadmaps[actual_skill]["advanced"]
                    })

                    added.add(actual_skill)

            continue

        # Case-insensitive Match
        for roadmap_skill in roadmaps:

            if roadmap_skill.lower() == skill.lower():

                if roadmap_skill not in added:

                    result.append({
                        "skill": roadmap_skill,
                        "beginner": roadmaps[roadmap_skill]["beginner"],
                        "intermediate": roadmaps[roadmap_skill]["intermediate"],
                        "advanced": roadmaps[roadmap_skill]["advanced"]
                    })

                    added.add(roadmap_skill)

                break

    return result