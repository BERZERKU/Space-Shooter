using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyBehavior : MonoBehaviour
{
    public string name = "";
    public int health = 0;

    private void Update()
    {
        if (transform.position.y < -20f)
        {
            Destroy(this);
        }
    }
}
