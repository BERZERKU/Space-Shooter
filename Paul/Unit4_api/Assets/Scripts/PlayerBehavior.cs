using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerBehavior : MonoBehaviour
{
    public float moveSpeed = 5f;

    private Rigidbody2D _rb2d;
    private Vector2 _movement;
    private Camera _camera;
    
    [SerializeField] private float maxHealth = 100f;
    private float _currentHealth;
    public float CurrentHealth => _currentHealth;

    // Start is called before the first frame update
    void Start()
    {
        _rb2d = GetComponent<Rigidbody2D>();
        _camera = FindObjectOfType<Camera>();
        _currentHealth = maxHealth;
    }

    // Update is called once per frame
    void Update()
    {
        if (_currentHealth > maxHealth) _currentHealth = maxHealth;

        _movement.x = Input.GetAxisRaw("Horizontal");
        _movement.y = Input.GetAxisRaw("Vertical");
        
        FaceMouse();
    }

    private void FixedUpdate()
    {
        _rb2d.MovePosition(_rb2d.position + moveSpeed * Time.fixedDeltaTime * _movement);
    }

    void AddHealth(float amount)
    {
        _currentHealth += amount;
    }

    void FaceMouse()
    {
        Vector3 mousePosition = Input.mousePosition;
        mousePosition = _camera.ScreenToWorldPoint(mousePosition);
        
        Vector2 direction = new Vector2(
            mousePosition.x - transform.position.x,
            mousePosition.y - transform.position.y
        );

        transform.up = direction;
    }
}
