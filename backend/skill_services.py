def match_skills(resume_text, required_skills):

    resume_text = resume_text.lower()

    matched = []

    for skill in required_skills:
        if skill.lower() in resume_text:
            matched.append(skill)

    return matched


def get_missing_skills(matched_skills, required_skills):

    return [
        skill
        for skill in required_skills
        if skill not in matched_skills
    ]