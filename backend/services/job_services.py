from db import job_roles_collection


def get_required_skills(role):

    job = job_roles_collection.find_one({
        "role_name": role
    })

    if not job:
        return []

    return job["required_skills"]