import unittest

from support import run_solution


class RemainderTest(unittest.TestCase):
    def test_case_01_10_modulo_3(self):
        """10 modulo 3."""
        result = run_solution('remainder', '10\n3')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n')

    def test_case_02_17_modulo_5(self):
        """17 modulo 5."""
        result = run_solution('remainder', '17\n5')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n')

    def test_edge_01_exact_division(self):
        """Exact division."""
        result = run_solution('remainder', '9\n3')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')

    def test_edge_02_zero_divisor(self):
        """Zero divisor."""
        result = run_solution('remainder', '5\n0')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('ZeroDivisionError', result.stderr)
        self.assertEqual(result.stdout, '')


if __name__ == "__main__":
    unittest.main()
