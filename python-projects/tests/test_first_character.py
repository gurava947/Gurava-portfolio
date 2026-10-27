import unittest

from support import run_solution


class FirstCharacterTest(unittest.TestCase):
    def test_case_01_python(self):
        """Python."""
        result = run_solution('first-character', 'Python\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'P\n')

    def test_case_02_unicode(self):
        """Unicode."""
        result = run_solution('first-character', 'ಗು\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'ಗ\n')

    def test_edge_01_empty_line(self):
        """Empty line."""
        result = run_solution('first-character', '\n')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('IndexError', result.stderr)
        self.assertEqual(result.stdout, "")


if __name__ == "__main__":
    unittest.main()
