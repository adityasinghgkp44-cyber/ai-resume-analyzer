from skill_services import match_skills, get_missing_skills

def extract_skills(text):

    if not text:
        return []

    text = text.lower()

    found_skills = []

    for skill in skills_database:

        if skill.lower() in text:
            found_skills.append(skill)

    return found_skills


def match_resume_with_jd(resume_text, jd_text):

    resume_skills = extract_skills(resume_text)

    jd_skills = extract_skills(jd_text)

    matched_skills = []

    missing_skills = []

    for skill in jd_skills:

        if skill in resume_skills:
            matched_skills.append(skill)

        else:
            missing_skills.append(skill)

    if len(jd_skills) == 0:
        match_percentage = 0

    else:
        match_percentage = round(
            len(matched_skills) / len(jd_skills) * 100,
            2
        )

    return {
        "match_percentage": match_percentage,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills
    }